import { commonService } from '@/service/common.service';
import { useEffect, useState } from 'react';

export const useFetchData = <T>(url: string, token?: string, query?: string) => {
   const [data, setData] = useState<T | null>(null);
   const [isLoading, setisLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const fetchData = async () => {
         setisLoading(true);
         const urlWithQuery = query ? `${url}${query}` : url;
         const { data, errorMessage } = await commonService.getData(urlWithQuery, token);
         if (errorMessage) {
            setError(errorMessage);
         } else {
            setError(null);
         }
         setisLoading(false);
         setData(data);
      };
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [url, query]);
   return { data, isLoading, error };
};
