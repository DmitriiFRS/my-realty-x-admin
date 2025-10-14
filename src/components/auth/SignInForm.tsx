'use client';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';
import { EyeCloseIcon, EyeIcon } from '@/icons';
import { authService } from '@/service/auth/auth.service';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import LoginPhoneInput from '../form/input/LoginPhoneInput';

export default function SignInForm() {
   const [showPassword, setShowPassword] = useState(false);
   const router = useRouter();
   const [loading, setLoading] = useState(false);
   const formik = useFormik({
      initialValues: {
         phone: '',
         password: '',
      },
      validationSchema: Yup.object({
         phone: Yup.string().required('Обязательное поле').min(12, 'Минимум 12 символов'),
         password: Yup.string().required('Обязательное поле').min(6, 'Минимум 6 символов'),
      }),
      onSubmit: async ({ phone, password }) => {
         try {
            setLoading(true);
            const result = await authService.login({
               phone,
               password,
            });
            if (result) {
               router.push('/');
               setLoading(false);
               router.refresh();
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
         } catch (err: any) {
            formik.setFieldError('phone', err.message || 'Ошибка входа');
            setLoading(false);
         }
      },
   });
   return (
      <div className="flex flex-col flex-1 lg:w-1/2 w-full">
         <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
            <div>
               <div className="mb-5 sm:mb-8">
                  <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">Вход</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Введите номер телефона и пароль чтобы войти</p>
               </div>
               <div>
                  <div className="relative py-3 sm:py-5"></div>
                  <form onSubmit={formik.handleSubmit}>
                     <div className="space-y-6">
                        <div>
                           <Label>
                              Номер телефона <span className="text-error-500">*</span>{' '}
                           </Label>
                           <LoginPhoneInput
                              handleBlur={formik.handleBlur}
                              setValue={formik.setFieldValue}
                              value={formik.values.phone}
                              touched={formik.touched.phone}
                              errorMsg={formik.errors.phone}
                           />
                        </div>
                        <div>
                           <Label>
                              Пароль <span className="text-error-500">*</span>{' '}
                           </Label>
                           <div className="relative">
                              <Input
                                 type={showPassword ? 'text' : 'password'}
                                 placeholder="Пароль"
                                 name="password"
                                 value={formik.values.password}
                                 onChange={formik.handleChange}
                                 onBlur={formik.handleBlur}
                              />
                              <span
                                 onClick={() => setShowPassword(!showPassword)}
                                 className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                              >
                                 {showPassword ? (
                                    <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                                 ) : (
                                    <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                                 )}
                              </span>
                           </div>
                        </div>
                        <div>
                           {loading ? (
                              <div>Загрузка...</div>
                           ) : (
                              <Button
                                 type="submit"
                                 className="w-full  text-gray-500 dark:text-gray-400 hover:bg-[#798bfd] bg-primary-blue"
                                 size="sm"
                              >
                                 Войти
                              </Button>
                           )}
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
}
