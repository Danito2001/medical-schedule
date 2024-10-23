import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {

    const cookieStore = cookies()
    const token = cookieStore.get('authToken')

    if (!token && req.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    if (token && req.nextUrl.pathname.startsWith('/auth/login')) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/auth/login'],
};
