import { NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
 
// Limit the middleware to paths starting with `/api/`
export const config = {
  matcher: '/api/secure/:function*',
}
 
export async function middleware(request) {
  // Call our authentication function to check the request
  const checkAuth = await isAuthenticated(request);
  if (!checkAuth.success) {
    // Respond with JSON indicating an error message
    return new NextResponse(
      JSON.stringify({ success: false, message: 'authentication failed', checkAuth: checkAuth }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    )
  }
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('userId', checkAuth.data)
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders
    },
  })
  return response
}