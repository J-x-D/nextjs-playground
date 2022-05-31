import NextAuth from "next-auth"
import Auth0Provider from "next-auth/providers/auth0";

const auth0Params = {
    clientId: process.env.AUTH0_CLIENT_ID!,
    clientSecret: process.env.AUTH0_CLIENT_SECRET!,
    issuer: process.env.AUTH0_ISSUER
}

console.log('%c[...nextauth].ts line:10 auth0Params', 'color: #007acc;', auth0Params);
export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Auth0Provider(auth0Params)
        // ...add more providers here
    ],
    secret: process.env.NEXT_PUBLIC_SECRET
})