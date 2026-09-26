import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { useAuth } from '../auth-context'
import { authErrorMessage } from '../auth.errors'
import { loginSchema, type LoginValues } from '../auth.schemas'
import { AuthCard } from '../components/AuthCard'
import { FormError } from '../components/FormError'
import { FormField } from '../components/FormField'

export default function LoginPage() {
  const { service } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/'
  const [formError, setFormError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) })

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null)
    try {
      const user = await service.signIn(values)
      navigate(user.emailVerified ? from : '/verify-email', { replace: true, state: { from } })
    } catch (error) {
      setFormError(authErrorMessage(error))
    }
  })

  return (
    <AuthCard
      title="Welcome back"
      description="Log in to continue learning."
      footer={
        <span>
          New here?{' '}
          <Link to="/signup" state={{ from }} className="font-medium text-primary hover:underline">
            Create an account
          </Link>
        </span>
      }
    >
      <form onSubmit={onSubmit} className="grid gap-4" noValidate>
        <FormError message={formError} />
        <FormField
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />
        <FormField
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register('password')}
        />
        <div className="-mt-2 text-right text-sm">
          <Link
            to="/forgot-password"
            className="text-muted-foreground hover:text-foreground hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in…' : 'Log in'}
        </Button>
      </form>
    </AuthCard>
  )
}
