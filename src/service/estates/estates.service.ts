import { ICreateEstateData } from '@/types/estates.type';
import { instance } from '../apiConfig';
import { handleAxiosError } from '@/helpers/handleAxiosError';

export const estatesService = {
   async createEstate(data: ICreateEstateData) {
      const formData = new FormData();
      formData.append('description', data.description);
      formData.append('estateTypeId', data.estateTypeId.toString());
      formData.append('cityId', data.cityId.toString());
      formData.append('districtId', data.districtId.toString());
      if (data.roomId) formData.append('roomId', data.roomId.toString());
      formData.append('currencyTypeId', data.currencyTypeId.toString());
      formData.append('dealTermId', data.dealTermId.toString());
      formData.append('area', data.area.toString());
      formData.append('price', data.price.toString());
      formData.append('primaryImage', data.primaryImage);
      data.images.forEach((image) => {
         formData.append(`images`, image);
      });
      try {
         const response = instance.post('/estates/create', formData, {
            headers: {
               'Content-Type': 'multipart/form-data',
            },
         });
         return response;
      } catch (error) {
         handleAxiosError(error);
      }
   },
};
