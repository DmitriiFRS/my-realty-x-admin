import { toast } from 'react-toastify';

interface HandleSubmitOptions<T> {
   apiCall: () => Promise<T>;
   setLoading: (loading: boolean) => void;
   successMessage: string;
   errorMessage: string;
   onSuccess?: () => void;
}

export async function handleSubmitCall<T>({ apiCall, setLoading, successMessage, errorMessage, onSuccess }: HandleSubmitOptions<T>) {
   setLoading(true);
   try {
      await apiCall();
      toast.success(successMessage);
      if (onSuccess) {
         onSuccess();
      }
   } catch (error) {
      toast.error(errorMessage);
      console.error(errorMessage, error);
   } finally {
      setLoading(false);
   }
}
