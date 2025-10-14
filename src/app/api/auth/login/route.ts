import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
   const { phone, password } = await req.json();

   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin-auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, password }),
   });

   if (!response.ok) {
      const err = await response.json();
      return NextResponse.json({ message: err.message || 'Неправильный телефон или пароль' }, { status: 401 });
   }

   const { token, user } = await response.json();

   const res = NextResponse.json({ ok: true, user });
   const maxAge = 60 * 60 * 24 * 7; // 7 days

   res.cookies.set('admin-token', token, {
      httpOnly: true,
      path: '/',
      maxAge,
      secure: process.env.NODE_ENV === 'production',
   });
   return res;
}
