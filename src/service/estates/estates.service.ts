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

   async updateEstate(id: number, data: IUpdateEstateData) {
      console.log('Updating estate with data:', data.existingImages);
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
         const response = instance.put(`/estates/admin-update/${id}`, formData, {
            headers: {
               'Content-Type': 'multipart/form-data',
            },
         });
         return response;
      } catch (error) {
         handleAxiosError(error);
      }
   },

   async deleteEstate(id: number) {
      try {
         const response = await instance.delete(`/estates/admin-delete/${id}`);
         return response;
      } catch (error) {
         handleAxiosError(error);
      }
   },
};
