import NextAuth from 'next-auth'

declare module 'next-auth' {
  export interface User {
    id: string
    name: string
    avatar_url: string
    ratings: string[]
  }

  interface Session {
    user: User
  }
}
