import { zodResolver } from '@hookform/resolvers/zod'
import { MailCheck } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { useAuth } from '../auth-context'
import { AuthError } from '../auth.service'
import { authErrorMessage } from '../auth.errors'
import { forgotPasswordSchema, type ForgotPasswordValues } from '../auth.schemas'
import { AuthCard } from '../components/AuthCard'
import { FormError } from '../components/FormError'
import { FormField } from '../components/FormField'

export default function ForgotPasswordPage() {
  const { service } = useAuth()
  const [sentTo, setSentTo] = useState<string | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({ resolver: zodResolver(forgotPasswordSchema) })

  const onSubmit = handleSubmit(async ({ email }) => {
    setFormError(null)
    try {
      await service.sendPasswordReset(email)
      setSentTo(email)
    } catch (error) {
      // Don't reveal whether an account exists.
      if (error instanceof AuthError && error.code === 'auth/user-not-found') setSentTo(email)
      else setFormError(authErrorMessage(error))
    }
  })

  const footer = (
    <Link to="/login" className="font-medium text-primary hover:underline">
      Back to log in
    </Link>
  )

  if (sentTo) {
    return (
      <AuthCard title="Check your inbox" footer={footer}>
        <div className="flex flex-col items-center gap-3 text-center">
          <MailCheck className="size-10 text-primary" />
          <p className="text-sm text-muted-foreground">
            If an account exists for <strong className="text-foreground">{sentTo}</strong>, you’ll
            receive a link to reset your password shortly.
          </p>
        </div>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Reset your password"
      description="We’ll email you a link to choose a new password."
      footer={footer}
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
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending…' : 'Send reset link'}
        </Button>
      </form>
    </AuthCard>
  )
}
