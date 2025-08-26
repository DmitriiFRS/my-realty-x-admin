import axios from 'axios';

export function handleAxiosError(error: unknown) {
   if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.detail || error.response?.data?.message || 'Произошла ошибка';
      console.error(error.response?.data?.instance, error.response?.data?.status);
      throw new Error(errorMessage);
   }
}
