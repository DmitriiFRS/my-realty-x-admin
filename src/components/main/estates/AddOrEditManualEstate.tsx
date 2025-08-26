/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import TextArea from '@/components/form/input/TextArea';
import Label from '@/components/form/Label';
import z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DropzoneComponent from '@/components/form/form-elements/DropZone';
import Select from '@/components/form/Select';
import Button from '@/components/ui/button/Button';
import { IEntity } from '@/types/entities.type';
import { useEffect } from 'react';
import NumberInput from '@/components/form/input/InputNumberField';
import { handleSubmitCall } from '@/helpers/handleSubmitCall';
import { estatesService } from '@/service/estates/estates.service';
import { ICreateEstateData } from '@/types/estates.type';

const schema = z.object({
   description: z.string(),
   estateTypeId: z.number().positive(),
   cityId: z.number().positive(),
   districtId: z.number().positive(),
   roomId: z.number().positive().optional(),
   currencyTypeId: z.number().positive(),
   dealTermId: z.number().positive(),
   area: z.string().min(1, 'Минимум 1').transform(Number),
   price: z.string().min(1, 'Минимум 1').transform(Number),
   primaryImage: z.any().optional(),
   images: z.array(z.any()).optional(),
});

type FormInput = z.input<typeof schema>;
type FormOutput = z.output<typeof schema>;

interface Props {
   estateTypes: IEntity[];
   rooms: IEntity[];
   dealTerms: IEntity[];
   cities: IEntity[];
   currencyTypes: IEntity[];
   districts: IEntity[];
}

const AddOrEditManualEstate: React.FC<Props> = ({ estateTypes, rooms, dealTerms, cities, currencyTypes, districts }) => {
   const {
      handleSubmit,
      control,
      watch,
      formState: { errors },
   } = useForm<FormInput, any, FormOutput>({
      resolver: zodResolver(schema),
      defaultValues: {
         description: '',
         estateTypeId: undefined,
         cityId: undefined,
         districtId: undefined,
         roomId: undefined,
         currencyTypeId: undefined,
         dealTermId: undefined,
         area: undefined,
         price: undefined,
         primaryImage: undefined,
         images: [],
      },
   });

   useEffect(() => {
      console.log('Form Values Changed:');
      console.log(watch());
      console.log('Form Errors:', errors);
   }, [watch(), errors]);

   const onSubmit = async (data: FormOutput) => {
      handleSubmitCall({
         apiCall: () => estatesService.createEstate(data as ICreateEstateData),
         setLoading: () => {},
         successMessage: 'Объявление успешно создано',
         errorMessage: 'Ошибка при создании объявления',
      });
   };
   return (
      <div>
         <PageBreadcrumb pageTitle="Создание объявления" />
         <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div>
               <div>
                  <Label>Описание</Label>
                  <TextArea rows={6} control={control} name="description" error={errors.description} />
               </div>
               <div className="grid grid-cols-2 gap-10 mt-5">
                  <div>
                     <Label>Тип недвижимости</Label>
                     <Controller
                        name="estateTypeId"
                        control={control}
                        render={({ field }) => {
                           return (
                              <Select
                                 options={estateTypes}
                                 onChange={(e) => field.onChange(Number(e.target.value))}
                                 value={field.value}
                                 placeholder="Select Option"
                                 className="dark:bg-dark-900"
                                 error={errors.estateTypeId}
                              />
                           );
                        }}
                     />
                  </div>
                  <div>
                     <Label>Город</Label>
                     <Controller
                        name="cityId"
                        control={control}
                        render={({ field }) => {
                           return (
                              <Select
                                 options={cities}
                                 onChange={(e) => field.onChange(Number(e.target.value))}
                                 value={field.value}
                                 placeholder="Select Option"
                                 className="dark:bg-dark-900"
                                 error={errors.cityId}
                              />
                           );
                        }}
                     />
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-10 mt-5">
                  <div>
                     <Label>Район</Label>
                     <Controller
                        name="districtId"
                        control={control}
                        render={({ field }) => {
                           return (
                              <Select
                                 options={districts}
                                 onChange={(e) => field.onChange(Number(e.target.value))}
                                 value={field.value}
                                 placeholder="Select Option"
                                 className="dark:bg-dark-900"
                                 error={errors.districtId}
                              />
                           );
                        }}
                     />
                  </div>
                  <div>
                     <Label>Количество комнат</Label>
                     <Controller
                        name="roomId"
                        control={control}
                        render={({ field }) => {
                           return (
                              <Select
                                 options={rooms}
                                 onChange={(e) => field.onChange(Number(e.target.value))}
                                 value={field.value}
                                 placeholder="Select Option"
                                 className="dark:bg-dark-900"
                                 error={errors.roomId}
                              />
                           );
                        }}
                     />
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-10 mt-5">
                  <div>
                     <Label>Тип валюты</Label>
                     <Controller
                        name="currencyTypeId"
                        control={control}
                        render={({ field }) => {
                           return (
                              <Select
                                 options={currencyTypes}
                                 onChange={(e) => field.onChange(Number(e.target.value))}
                                 value={field.value}
                                 placeholder="Select Option"
                                 className="dark:bg-dark-900"
                                 error={errors.currencyTypeId}
                              />
                           );
                        }}
                     />
                  </div>
                  <div>
                     <Label>Тип сделки</Label>
                     <Controller
                        name="dealTermId"
                        control={control}
                        render={({ field }) => {
                           return (
                              <Select
                                 options={dealTerms}
                                 onChange={(e) => field.onChange(Number(e.target.value))}
                                 value={field.value}
                                 placeholder="Select Option"
                                 className="dark:bg-dark-900"
                                 error={errors.dealTermId}
                              />
                           );
                        }}
                     />
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-10 mt-5">
                  <div>
                     <Label>Площадь</Label>
                     <NumberInput type="text" control={control} name="area" error={errors.area} />
                  </div>
                  <div>
                     <Label>Цена</Label>
                     <NumberInput type="text" control={control} name="price" error={errors.price} />
                  </div>
               </div>
            </div>
            <div className="flex flex-col gap-10">
               <Controller
                  name="primaryImage"
                  control={control}
                  render={({ field }) => (
                     <DropzoneComponent title="Картинка для обложки" isSingleImage={true} value={field.value} onChange={field.onChange} />
                  )}
               />
               <Controller
                  name="images"
                  control={control}
                  render={({ field }) => <DropzoneComponent title="Массив картинок" value={field.value} onChange={field.onChange} />}
               />
            </div>
            <div className="">
               <Button>Применить</Button>
            </div>
         </form>
      </div>
   );
};

export default AddOrEditManualEstate;
