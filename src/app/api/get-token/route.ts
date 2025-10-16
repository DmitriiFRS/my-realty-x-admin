import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
   const token = req.cookies.get('admin-token')?.value;
   if (!token) {
      return new Response(JSON.stringify({ message: 'Токен не найден' }), { status: 401 });
   }
   return new Response(JSON.stringify({ token }), { status: 200 });
}
