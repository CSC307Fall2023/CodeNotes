import { withAuth } from 'next-auth/middleware'

// middleware is applied to all routes, use conditionals to select

export default withAuth(function middleware(req) {}, {
    callbacks: {
        authorized: ({ req, token }) => {
            if (
                req.nextUrl.pathname.startsWith('/api/account') &&
                token === null
            ) {
                return false
            }
            if (
                req.nextUrl.pathname.startsWith('/api/classes') &&
                token === null
            ) {
                return false
            }
            if (
                req.nextUrl.pathname.startsWith('/api/notebooks') &&
                token === null
            ) {
                return false
            }
            if (
                req.nextUrl.pathname.startsWith('/api/notes') &&
                token === null
            ) {
                return false
            }
            if (
                req.nextUrl.pathname.startsWith('/api/profile') &&
                token === null
            ) {
                return false
            }
            if (
                req.nextUrl.pathname.startsWith('/api/users') &&
                token === null
            ) {
                return false
            }
            return true
        },
    },
})
