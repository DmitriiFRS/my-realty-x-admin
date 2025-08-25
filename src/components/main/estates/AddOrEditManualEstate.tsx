'use client';

import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import TextArea from '@/components/form/input/TextArea';
import Label from '@/components/form/Label';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DropzoneComponent from '@/components/form/form-elements/DropZone';
import Input from '@/components/form/input/InputField';
import Select from '@/components/form/Select';
import Button from '@/components/ui/button/Button';

const schema = z.object({
   description: z.string().min(10, { message: 'Description should be at least 10 characters long' }),
});

type FormData = z.infer<typeof schema>;

interface Props {}

const options = [
   { value: 'marketing', label: 'Marketing' },
   { value: 'template', label: 'Template' },
   { value: 'development', label: 'Development' },
];

const AddOrEditManualEstate: React.FC<Props> = ({}) => {
   //react-hook=form here
   const { handleSubmit, register } = useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: {
         description: '',
      },
   });

   const onSubmit = async (data: FormData) => {};
   return (
      <div>
         <PageBreadcrumb pageTitle="Создание объявления" />
         <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div>
               <div>
                  <Label>Описание</Label>
                  <TextArea rows={6} />
               </div>
               <div className="grid grid-cols-2 gap-10 mt-5">
                  <div>
                     <Label>Тип недвижимости</Label>
                     <Select options={options} placeholder="Select Option" className="dark:bg-dark-900" />
                  </div>
                  <div>
                     <Label>Район</Label>
                     <Select options={options} placeholder="Select Option" className="dark:bg-dark-900" />
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-10 mt-5">
                  <div>
                     <Label>Площадь</Label>
                     <Input type="text" />
                  </div>
                  <div>
                     <Label>Цена</Label>
                     <Input type="text" />
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-10 mt-5">
                  <div>
                     <Label>Тип валюты</Label>
                     <Select options={options} placeholder="Select Option" className="dark:bg-dark-900" />
                  </div>
                  <div>
                     <Label>Количество комнат</Label>
                     <Select options={options} placeholder="Select Option" className="dark:bg-dark-900" />
                  </div>
               </div>
               <div className="mt-5">
                  <Label>Тип сделки</Label>
                  <Select options={options} placeholder="Select Option" className="dark:bg-dark-900" />
               </div>
            </div>
            <div className="flex flex-col gap-10">
               <DropzoneComponent title="Картинка для обложки" />
               <DropzoneComponent title="Массив картинок" />
            </div>
            <div className="">
               <Button>Применить</Button>
            </div>
         </form>
      </div>
   );
};

export default AddOrEditManualEstate;
