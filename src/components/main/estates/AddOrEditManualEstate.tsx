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
import NumberInput from '@/components/form/input/InputNumberField';
import { handleSubmitCall } from '@/helpers/handleSubmitCall';
import { estatesService } from '@/service/estates/estates.service';
import { ICreateEstateData, IEstate, IUpdateEstateData } from '@/types/estates.type';
import { IMedia } from '@/types/common.type';
import Checkbox from '@/components/form/input/Checkbox';
import { statuses } from '@/data/statuses.data';
import { useEffect, useState } from 'react';
import SearchDropdownInput from '@/components/form/SearchDropdownInput';

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
   featureIds: z.array(z.number().positive()).optional(),
   status: z.enum(['pending', 'verified', 'rejected']),
   targetUserId: z.number({ message: 'Требуется выбрать отправителя' }),
   primaryImage: z.any().optional(),
   existingImages: z.array(z.any()).optional(),
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
   estateFeatures: IEntity[];
   estate?: IEstate;
}

const AddOrEditManualEstate: React.FC<Props> = ({
   estateTypes,
   rooms,
   dealTerms,
   cities,
   currencyTypes,
   districts,
   estateFeatures,
   estate,
}) => {
   const [targetUserValue, setTargetUserValue] = useState<string>('');
   useEffect(() => {
      if (!estate?.user?.id) return;
      if (estate?.user?.name && estate?.user?.phone) setTargetUserValue(estate.user.name + ' ' + estate.user.phone);
      console.log(estate?.user);
   }, [estate]);

   const {
      handleSubmit,
      control,
      watch,
      reset,
      getValues,

      setValue,
      formState: { errors },
   } = useForm<FormInput, any, FormOutput>({
      resolver: zodResolver(schema),
      defaultValues: {
         description: estate?.description || '',
         estateTypeId: estate?.estateType?.id || undefined,
         cityId: estate?.city?.id || undefined,
         districtId: estate?.district?.id || undefined,
         roomId: estate?.room?.id || undefined,
         currencyTypeId: estate?.currencyType?.id || undefined,
         dealTermId: estate?.dealTerm?.id || undefined,
         area: estate?.area.toString() || undefined,
         price: estate?.price || undefined,
         featureIds: estate?.features.map((el) => el.id) || [],
         status: estate?.status?.status || 'pending',
         targetUserId: estate?.user?.id || undefined,
         primaryImage: estate?.primaryImageUrl || undefined,
         existingImages: estate?.media || [],
         images: [],
      },
   });

   useEffect(() => {
      if (estate) {
         setTargetUserValue(estate.user?.name + ' ' + estate.user?.phone);
         const formValues = {
            targetUserId: estate.user?.id || undefined,
         };
         reset(formValues);
      }
   }, [estate]);

   useEffect(() => {
      console.log('Form Values Changed:');
      console.log(watch());
      console.log('Form Errors:', errors);
   }, [watch(), errors]);

   function removeImageFromArray(item: File | IMedia) {
      const existingArr = getValues().existingImages || [];
      const imagesArr = getValues().images || [];
      if (item instanceof File) {
         const updatedImages = imagesArr.filter((img) => img !== item);
         setValue('images', updatedImages);
      } else {
         const updatedExistingImages = existingArr.filter((img) => img.id !== item.id);
         setValue('existingImages', updatedExistingImages);
      }
   }

   const onSubmit = async (data: FormOutput) => {
      if (estate) {
         handleSubmitCall({
            apiCall: () => estatesService.updateEstate(estate.id, data as IUpdateEstateData),
            setLoading: () => {},
            successMessage: 'Объявление успешно обновлено',
            errorMessage: 'Ошибка при обновлении объявления',
         });
      } else {
         handleSubmitCall({
            apiCall: () => estatesService.createEstate(data as ICreateEstateData),
            setLoading: () => {},
            successMessage: 'Объявление успешно создано',
            errorMessage: 'Ошибка при создании объявления',
         });
      }
   };
   return (
      <div>
         {/* {<pre>{JSON.stringify(errors, null, 2)}</pre>} */}
         <PageBreadcrumb pageTitle={estate ? 'Редактирование объявления' : 'Создание объявления'} />
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
               <div className="mt-10 grid grid-cols-3">
                  {estateFeatures &&
                     estateFeatures.length > 0 &&
                     estateFeatures.map((el, index) => {
                        const isChecked = watch('featureIds')?.includes(el.id);
                        return (
                           <div key={index}>
                              <Checkbox
                                 label={el.name}
                                 checked={isChecked || false}
                                 onChange={(isChecked: boolean) => {
                                    const featureIds = getValues('featureIds') || [];
                                    if (isChecked) {
                                       setValue('featureIds', [...featureIds, el.id]);
                                    } else {
                                       setValue(
                                          'featureIds',
                                          featureIds.filter((id) => id !== el.id)
                                       );
                                    }
                                 }}
                              />
                           </div>
                        );
                     })}
               </div>
               <div className="mt-5 flex flex-col max-w-[calc(50%-20px)]">
                  <Label>Статус</Label>
                  <Controller
                     name="status"
                     control={control}
                     render={({ field }) => {
                        const selectedStatusId = statuses.find((s) => s.slug === field.value.toLowerCase())?.id;
                        return (
                           <Select
                              options={statuses}
                              onChange={(e) => field.onChange(statuses.find((status) => status.id === Number(e.target.value))?.slug)}
                              value={selectedStatusId}
                              placeholder="Select Option"
                              className="dark:bg-dark-900"
                              error={errors.status}
                           />
                        );
                     }}
                  />
               </div>
               <div className="mt-7.5">
                  <SearchDropdownInput
                     name="targetUserId"
                     setValue={setValue}
                     error={errors.targetUserId}
                     placeholder="Поиск пользователя по ФИО или телефону"
                     searchValue={targetUserValue}
                     setSearchValue={setTargetUserValue}
                  />
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
                  render={({ field }) => (
                     <DropzoneComponent
                        title="Массив картинок"
                        value={field.value}
                        onChange={field.onChange}
                        existingImages={watch('existingImages') as IMedia[] | undefined}
                        removeImageFromArray={removeImageFromArray}
                     />
                  )}
               />
            </div>
            <div className="">
               <Button type="submit">Применить</Button>
            </div>
         </form>
      </div>
   );
};

export default AddOrEditManualEstate;
