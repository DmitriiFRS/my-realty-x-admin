export const entitiesService = {
   /**
    * Получает данные для указанной сущности.
    * @param entity - Название сущности (например, 'posts', 'users').
    */
   async getEntity(entity: string) {
      // Собираем полный URL для запроса из переменной окружения и имени сущности.
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/${entity}`;
      console.log(`Fetching data from: ${apiUrl}`); // Лог для отладки, чтобы видеть URL

      try {
         const response = await fetch(apiUrl);

         // fetch не считает ошибки 4xx/5xx провалом, поэтому проверяем статус вручную.
         // response.ok === true для статусов 200-299.
         if (!response.ok) {
            // Если статус ответа не успешный, создаем и выбрасываем ошибку.
            throw new Error(`HTTP Error! Status: ${response.status} ${response.statusText}`);
         }

         // Если все хорошо, парсим JSON и возвращаем его.
         const data = await response.json();
         return data;
      } catch (error) {
         // Ловим любые ошибки (сетевые или созданные нами выше) и выводим в консоль.
         console.error(`[FETCH ERROR] Could not fetch "${entity}":`, error);
         // В случае ошибки функция вернет undefined, как и в твоем исходном примере.
      }
   },
};
