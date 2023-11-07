import { NextAuthOptions } from "next-auth"
import { SupabaseAdapter } from "@auth/supabase-adapter"
import GitHubProvider from "next-auth/providers/github"
import { env } from "@/env.mjs"


// For more information on each option (and a full list of options) go to
// https://authjs.dev/reference/core/module.index#authconfig
export const authOptions: NextAuthOptions = {
  // https://authjs.dev/reference/core/providers
  providers: [GitHubProvider({
    clientId: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET,
  }),],
  adapter: SupabaseAdapter({
    url: env.NEXT_PUBLIC_SUPABASE_URL,
    secret: env.SUPABASE_SERVICE_ROLE_KEY,
  }),
  callbacks: {
    async session({ session, token, user }) {
        return session
      },
    }
}