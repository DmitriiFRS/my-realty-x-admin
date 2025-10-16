import { cookies } from 'next/headers';

export async function GET() {
   const cookieStore = await cookies();
   const token = cookieStore.get('admin-token')?.value;

   if (!token) {
      return new Response(JSON.stringify({ message: 'Токен не найден' }), { status: 401 });
   }
   cookieStore.delete('admin-token');
   return new Response(JSON.stringify({ message: 'Вы успешно вышли из системы' }), { status: 200 });
}
