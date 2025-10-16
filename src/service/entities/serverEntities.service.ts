import axios from 'axios';
import { instance } from '../apiConfig';

export const serverEntitiesService = {
   async getEntity(entity: string, token: string | undefined) {
      if (!token) {
         console.error('No token provided');
         return null;
      }
      try {
         const response = await instance.get(entity, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });
         return response.data;
      } catch (error) {
         if (axios.isAxiosError(error)) {
            console.error(`Axios error fetching "${entity}":`);
            if (error.response) {
               console.error('Data:', error.response.data);
            }
         }
      }
   },
   async deleteEntity(entity: string) {
      const tokenData = await axios.get('/api/get-token');
      try {
         const response = await instance.delete(entity, {
            headers: {
               Authorization: `Bearer ${tokenData?.data?.token}`,
            },
         });
         return response.data;
      } catch (error) {
         console.error(error);
      }
   },
};
