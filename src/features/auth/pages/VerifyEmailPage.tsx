import { MailWarning } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { useAuth } from '../auth-context'
import { authErrorMessage } from '../auth.errors'
import { AuthCard } from '../components/AuthCard'
import { FullPageSpinner } from '../components/FullPageSpinner'

const RESEND_COOLDOWN_SECONDS = 60

export default function VerifyEmailPage() {
  const { user, loading, service, refreshUser } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/'
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS)
  const [checking, setChecking] = useState(false)

  useEffect(() => {
    if (cooldown <= 0) return
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [cooldown])

  // Pick up a verification done in another tab (or via the email's Continue button) without a
  // click: check on arrival and whenever this tab becomes visible again.
  const uid = user?.uid
  const verified = user?.emailVerified
  useEffect(() => {
    if (!uid || verified) return
    const check = () => {
      if (document.visibilityState !== 'visible') return
      refreshUser().then(
        (next) => next?.emailVerified && toast.success('Email verified — welcome aboard!'),
        () => {}, // Best effort: the "I've verified" button still reports errors.
      )
    }
    check()
    document.addEventListener('visibilitychange', check)
    return () => document.removeEventListener('visibilitychange', check)
  }, [uid, verified, refreshUser])

  if (loading) return <FullPageSpinner />
  if (!user) return <Navigate to="/login" replace />
  if (user.emailVerified) return <Navigate to={from} replace />

  const resend = async () => {
    try {
      await service.sendVerificationEmail()
      toast.success('Verification email sent.')
      setCooldown(RESEND_COOLDOWN_SECONDS)
    } catch (error) {
      toast.error(authErrorMessage(error))
    }
  }

  const checkVerified = async () => {
    setChecking(true)
    try {
      const next = await refreshUser()
      if (next?.emailVerified) {
        toast.success('Email verified — welcome aboard!')
        navigate(from, { replace: true })
      } else {
        toast.info('Not verified yet. Click the link in the email, then try again.')
      }
    } catch (error) {
      toast.error(authErrorMessage(error))
    } finally {
      setChecking(false)
    }
  }

  return (
    <AuthCard
      title="Verify your email"
      footer={
        <button
          type="button"
          className="hover:text-foreground hover:underline"
          onClick={() => service.signOut()}
        >
          Use a different account
        </button>
      }
    >
      <div className="grid gap-5 text-center">
        <MailWarning className="mx-auto size-10 text-primary" />
        <p className="text-sm text-muted-foreground">
          We sent a verification link to <strong className="text-foreground">{user.email}</strong>.
          Click it to unlock the lessons, then come back here.
        </p>
        <Button onClick={checkVerified} disabled={checking}>
          {checking ? 'Checking…' : 'I’ve verified my email'}
        </Button>
        <Button variant="outline" onClick={resend} disabled={cooldown > 0}>
          {cooldown > 0 ? `Resend email in ${cooldown}s` : 'Resend verification email'}
        </Button>
      </div>
    </AuthCard>
  )
}
