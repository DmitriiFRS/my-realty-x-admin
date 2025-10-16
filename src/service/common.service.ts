import axios from 'axios';

export const commonService = {
   async getData(urlParam: string, token?: string | undefined) {
      try {
         const headers: HeadersInit = {};
         if (token) {
            headers['Authorization'] = `Bearer ${token}`;
         }
         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${urlParam}`, {
            headers,
            next: { revalidate: 0 },
         });
         if (response.status === 404) {
            // Предполагаем, что T - это массив, и возвращаем пустой массив.
            return { data: [], errorMessage: null };
         }
         const data = await response.json();
         return { data, errorMessage: null };
      } catch (error) {
         console.error('Ошибка:', error);
         return {
            data: null,
            errorMessage: error instanceof Error ? error.message : 'Не удалось загрузить данные',
         };
      }
   },
   async getSearchedItems(searchText: string) {
      try {
         const tokenRes = await fetch('/api/get-token');
         if (!tokenRes.ok) {
            throw new Error(`Не удалось получить токен: ${tokenRes.statusText}`);
         }
         const data = await tokenRes.json();
         const token = data.token;
         const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/search`, {
            params: { searchText },
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });
         if (response.status >= 300) {
            throw new Error('Failed to fetch searched items');
         }
         return response.data;
      } catch (error) {
         console.log('Error in getSearchedItems:', error);
      }
   },
};
