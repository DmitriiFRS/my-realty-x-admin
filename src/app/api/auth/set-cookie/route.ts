import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
   const data = await req.json();
   // логируйте токен — вы уже это делаете

   const maxAge = 60 * 60 * 24 * 7; // неделя
   const res = NextResponse.json({ success: true });
   const token = data.token;

   res.cookies.set({
      name: 'admin-token',
      value: token,
      httpOnly: true,
      path: '/',
      maxAge,
      secure: process.env.NODE_ENV === 'production', // в dev=false
      sameSite: 'lax', // или 'strict' в зависимости от требований
   });

   return res;
}
