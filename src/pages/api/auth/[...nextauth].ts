import { NextApiRequest, NextApiResponse, NextPageContext } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GithubProvider, { GithubProfile } from 'next-auth/providers/github'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
import { PrismaAdapter } from '@/lib/auth/prisma-adapter'

export function buildNextAuthOptions(
  req: NextApiRequest | NextPageContext['req'],
  res: NextApiResponse | NextPageContext['res'],
): NextAuthOptions {
  return {
    adapter: PrismaAdapter(req, res),
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID || '',
        clientSecret: process.env.GITHUB_SECRET || '',

        profile: (profile: GithubProfile) => {
          return {
            id: profile.id.toString(),
            name: profile.name || '',
            username: '',
            email: '',
            avatar_url: profile.avatar_url,
          }
        },
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID ?? '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        authorization: {
          params: {
            prompt: 'consent',
            access_type: 'offline',
            response_type: 'code',
            scope: 'https://www.googleapis.com/auth/userinfo.profile',
          },
        },
        profile: (profile: GoogleProfile) => {
          return {
            id: profile.sub,
            name: profile.name,
            username: '',
            email: '',
            avatar_url: profile.picture,
          }
        },
      }),
    ],
    callbacks: {
      async signIn() {
        return true
      },

      async session({ session, user }) {
        return {
          ...session,
          user: {
            ...user,
          },
        }
      },
    },
  }
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, buildNextAuthOptions(req, res))
}
