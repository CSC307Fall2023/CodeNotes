import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { checkLoggedIn } from '@/lib/auth'

// Waiting for request! Confirm with Fox @mshlimenzon924
export async function middleware(request: NextRequest) {

  if (request.nextUrl.pathname.startsWith('/api')) {
    const loggedInData = await checkLoggedIn()
    if (!loggedInData.loggedIn) {
      return NextResponse.json({}, {status: 401, statusText: "Unauthorized"});
    }
  }

  return NextResponse.next();
}

