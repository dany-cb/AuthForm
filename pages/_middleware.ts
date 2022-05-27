import { NextRequest, NextResponse } from 'next/server'

const signedInPages = ['/signin', '/signup']
const protectedPages = ['/']

export default function middleware(req: NextRequest) {
  const auth_token = req.cookies.AUTH_TOKEN
  if (signedInPages.find((p) => p === req.nextUrl.pathname)) {
    if (auth_token) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }
  if (protectedPages.find((p) => p === req.nextUrl.pathname)) {
    if (!auth_token) {
      return NextResponse.redirect(new URL('/signin', req.url))
    }
  }
}
