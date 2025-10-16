import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { authService } from './service/auth/auth.service';

export default async function middleware(req: NextRequest) {
   const { pathname } = req.nextUrl;
   const token = req.cookies.get('admin-token')?.value;
   //
   if (token && pathname === '/signin') {
      try {
         const secret = new TextEncoder().encode(process.env.JWT_SECRET || '');
         console.log('Veifying token:', token);
         await jwtVerify(token, secret);
         console.log('Token is valid');
         const user = await authService.getUserData(token);
         if (user && user.id) {
            const url = req.nextUrl.clone();
            url.pathname = '/';
            return NextResponse.redirect(url);
         }
      } catch {
         const url = req.nextUrl.clone();
         url.pathname = '/signin';
         const res = NextResponse.redirect(url);
         res.cookies.delete('admin-token');
         return res;
      }
   }

   if (!token && pathname !== '/signin') {
      const url = req.nextUrl.clone();
      url.pathname = '/signin';
      return NextResponse.redirect(url);
   }

   if (token && pathname !== '/signin') {
      try {
         const secret = new TextEncoder().encode(process.env.JWT_SECRET || '');
         await jwtVerify(token, secret);
         const user = await authService.getUserData(token);
         if (!user || !user.id) {
            const url = req.nextUrl.clone();
            url.pathname = '/signin';
            return NextResponse.redirect(url);
         }
         // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
         const url = req.nextUrl.clone();
         url.pathname = '/signin';
         const res = NextResponse.redirect(url);
         res.cookies.delete('admin-token');
         return res;
      }
   }

   return NextResponse.next();
}

export const config = {
   matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
