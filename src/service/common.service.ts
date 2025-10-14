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
};
