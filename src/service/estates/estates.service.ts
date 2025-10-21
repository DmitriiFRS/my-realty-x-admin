import { ICreateEstateData, IUpdateEstateData } from '@/types/estates.type';
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
      formData.append('status', data.status);
      formData.append('primaryImage', data.primaryImage);
      formData.append('features', JSON.stringify(data.featureIds));
      formData.append('targetUserId', data.targetUserId.toString());
      data.images.forEach((image) => {
         formData.append(`images`, image);
      });
      const tokenRes = await fetch('/api/get-token');
      if (!tokenRes.ok) {
         throw new Error(`Не удалось получить токен: ${tokenRes.statusText}`);
      }
      const tokenData = await tokenRes.json();
      const token = tokenData.token;
      try {
         const response = instance.post('/estates/admin-create', formData, {
            headers: {
               'Content-Type': 'multipart/form-data',
               Authorization: `Bearer ${token}`,
            },
         });
         return response;
      } catch (error) {
         handleAxiosError(error);
      }
   },

   async updateEstate(id: number, data: IUpdateEstateData) {
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
      formData.append('status', data.status);
      formData.append('features', JSON.stringify(data.featureIds));
      formData.append('targetUserId', data.targetUserId.toString());
      if (data.primaryImage instanceof File) {
         formData.append('primaryImage', data.primaryImage);
      }
      if (data.images && data.images.length > 0) {
         data.images.forEach((image) => {
            formData.append(`images`, image);
         });
      }
      if (data.existingImages && data.existingImages.length > 0) {
         formData.append('existingImageIds', JSON.stringify(data.existingImages.map((i) => i.id)));
      }
      try {
         const tokenRes = await fetch('/api/get-token');
         if (!tokenRes.ok) {
            throw new Error(`Не удалось получить токен: ${tokenRes.statusText}`);
         }
         const tokenData = await tokenRes.json();
         const token = tokenData.token;
         const response = instance.put(`/estates/admin-update/${id}`, formData, {
            headers: {
               'Content-Type': 'multipart/form-data',
               Authorization: `Bearer ${token}`,
            },
         });
         return response;
      } catch (error) {
         handleAxiosError(error);
      }
   },

   async deleteEstate(id: number) {
      const tokenRes = await fetch('/api/get-token');
      if (!tokenRes.ok) {
         throw new Error(`Не удалось получить токен: ${tokenRes.statusText}`);
      }
      const tokenData = await tokenRes.json();
      const token = tokenData.token;
      try {
         const response = await instance.delete(`/estates/admin-delete/${id}`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });
         return response;
      } catch (error) {
         handleAxiosError(error);
      }
   },
};
