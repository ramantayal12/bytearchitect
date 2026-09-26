export interface AppUser {
  uid: string
  email: string
  displayName: string
  emailVerified: boolean
}

export interface SignUpInput {
  displayName: string
  email: string
  password: string
}

export interface SignInInput {
  email: string
  password: string
}
