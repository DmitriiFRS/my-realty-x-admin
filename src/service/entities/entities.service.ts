import axios from 'axios';
import { instance } from '../apiConfig';

export const entitiesService = {
   async getEntity(entity: string) {
      try {
         const response = await instance.get(entity);
         return response.data;
      } catch (error) {
         if (axios.isAxiosError(error)) {
            console.error(`Axios error fetching "${entity}":`);
         }
         if (error.response) {
            console.error('Data:', error.response.data);
         }
      }
   },
};
