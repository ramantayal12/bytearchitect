import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { useAuth } from '../auth-context'
import { authErrorMessage } from '../auth.errors'
import { signupSchema, type SignupValues } from '../auth.schemas'
import { AuthCard } from '../components/AuthCard'
import { FormError } from '../components/FormError'
import { FormField } from '../components/FormField'

export default function SignupPage() {
  const { service, refreshUser } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/'
  const [formError, setFormError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({ resolver: zodResolver(signupSchema) })

  const onSubmit = handleSubmit(async ({ displayName, email, password }) => {
    setFormError(null)
    try {
      await service.signUp({ displayName, email, password })
      await refreshUser() // pick up the display name set during sign-up
      navigate('/verify-email', { replace: true, state: { from } })
    } catch (error) {
      setFormError(authErrorMessage(error))
    }
  })

  return (
    <AuthCard
      title="Create your account"
      description="Track your progress and quiz scores across devices."
      footer={
        <span>
          Already have an account?{' '}
          <Link to="/login" state={{ from }} className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </span>
      }
    >
      <form onSubmit={onSubmit} className="grid gap-4" noValidate>
        <FormError message={formError} />
        <FormField
          id="displayName"
          label="Name"
          autoComplete="name"
          error={errors.displayName?.message}
          {...register('displayName')}
        />
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
          autoComplete="new-password"
          error={errors.password?.message}
          {...register('password')}
        />
        <FormField
          id="confirmPassword"
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account…' : 'Create account'}
        </Button>
      </form>
    </AuthCard>
  )
}
