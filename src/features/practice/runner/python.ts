import type { Signature } from '../practice.types'
import type { Execution, Harness } from './protocol'

/** Version of the Pyodide runtime (CPython compiled to WebAssembly) the browser downloads. */
export const PYODIDE_VERSION = '314.0.7'
export const PYODIDE_INDEX_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`

/** The slice of the Pyodide API the harness uses. */
export interface PythonRuntime {
  runPython(code: string): unknown
}

/**
 * Runs inside Pyodide. User code is executed in a fresh namespace per run, pre-populated
 * with the imports LeetCode's Python 3 environment provides, and compiled as
 * "solution.py" so tracebacks point at the learner's own line numbers.
 */
export const PYTHON_HARNESS = `
import io, json, sys, time, traceback

_BA_PRELUDE = """
from typing import *
import bisect, collections, functools, heapq, itertools, math, operator, random, re, string
from bisect import bisect_left, bisect_right, insort
from collections import Counter, OrderedDict, defaultdict, deque
from functools import cache, cmp_to_key, lru_cache, reduce
from heapq import heapify, heappop, heappush, heappushpop, heapreplace, nlargest, nsmallest
from itertools import accumulate, chain, combinations, groupby, pairwise, permutations, product
from math import ceil, comb, floor, gcd, inf, isqrt, sqrt
"""
_BA_STDOUT_LIMIT = 16384
_ba_ns = None
_ba_spec = None


def _ba_describe(exc):
    frames = [f for f in traceback.extract_tb(exc.__traceback__) if f.filename == "solution.py"]
    where = f" (line {frames[-1].lineno})" if frames else ""
    return f"{type(exc).__name__}: {exc}{where}"


def _ba_prepare(code, spec_json):
    global _ba_ns, _ba_spec
    spec = json.loads(spec_json)
    ns = {"__name__": "__main__"}
    exec(_BA_PRELUDE, ns)
    saved, sys.stdout = sys.stdout, io.StringIO()
    try:
        exec(compile(code, "solution.py", "exec"), ns)
    except SyntaxError as exc:
        return f"{type(exc).__name__}: {exc.msg} (line {exc.lineno})"
    except BaseException as exc:
        return _ba_describe(exc)
    finally:
        sys.stdout = saved
    if spec["kind"] == "function":
        solution = ns.get("Solution")
        if not (isinstance(solution, type) and hasattr(solution, spec["name"])):
            return f"NameError: class Solution with a method {spec['name']} is not defined. Keep the method name from the starter code."
    elif not isinstance(ns.get(spec["className"]), type):
        return f"NameError: class {spec['className']} is not defined. Keep the class name from the starter code."
    _ba_ns, _ba_spec = ns, spec
    return None


def _ba_call(args):
    if _ba_spec["kind"] == "function":
        return getattr(_ba_ns["Solution"](), _ba_spec["name"])(*args)
    cls = _ba_ns[_ba_spec["className"]]
    instance, results = None, []
    for op, op_args in zip(*args):
        if op == _ba_spec["className"]:
            instance = cls(*op_args)
            results.append(None)
        else:
            results.append(getattr(instance, op)(*op_args))
    return results


def _ba_default(value):
    # Sets, deques, generators and other iterables serialize as lists.
    if hasattr(value, "__iter__"):
        return list(value)
    raise TypeError(f"return value of type {type(value).__name__} is not supported")


def _ba_run(args_json):
    args = json.loads(args_json)
    out = io.StringIO()
    saved, sys.stdout = sys.stdout, out
    start = time.perf_counter()
    try:
        result = {"ok": True, "value": _ba_call(args)}
    except BaseException as exc:
        result = {"ok": False, "error": _ba_describe(exc)}
    finally:
        sys.stdout = saved
    result["timeMs"] = (time.perf_counter() - start) * 1000
    result["stdout"] = out.getvalue()[:_BA_STDOUT_LIMIT]
    try:
        return json.dumps(result, default=_ba_default, allow_nan=False)
    except (TypeError, ValueError) as exc:
        result.pop("value", None)
        return json.dumps({**result, "ok": False, "error": f"Invalid return value: {exc}"})
`

type PyFunction = (...args: string[]) => string | undefined

const installed = new WeakMap<PythonRuntime, { prepare: PyFunction; run: PyFunction }>()

function harnessFunctions(runtime: PythonRuntime) {
  let fns = installed.get(runtime)
  if (!fns) {
    runtime.runPython(PYTHON_HARNESS)
    fns = {
      prepare: runtime.runPython('_ba_prepare') as PyFunction,
      run: runtime.runPython('_ba_run') as PyFunction,
    }
    installed.set(runtime, fns)
  }
  return fns
}

/** Runs Python 3 in a loaded Pyodide runtime (the browser worker's, or Node's in tests). */
export function createPythonHarness(runtime: PythonRuntime, signature: Signature): Harness {
  const fns = harnessFunctions(runtime)
  return {
    async prepare(code) {
      return fns.prepare(code, JSON.stringify(signature)) ?? undefined
    },
    async run(args) {
      return JSON.parse(fns.run(JSON.stringify(args))!) as Execution
    },
  }
}
