import { IResponseUserData } from '@/types/user.type';

export const authService = {
   async login({ phone, password }: { phone: string; password: string }): Promise<IResponseUserData | undefined> {
      console.log(phone);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/admin-login`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ phone: `+${phone}`, password }),
      });
      if (!response.ok) {
         const { message } = await response.json();
         throw new Error(message || 'Ошибка логина');
      }
      const resData = await response.json();
      console.log(resData);
      await fetch('/api/auth/set-cookie', {
         method: 'POST',
         credentials: 'include',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ token: resData.accessToken }),
      });
      return resData;
   },
   async getUserData(token: string | undefined) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/get-me-admin`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
         },
      });

      if (!response.ok) {
         const { message } = await response.json();
         console.log('Error message:', message);
         throw new Error(message || 'Ошибка получения данных пользователя');
      }
      return response.json();
   },
};
