'use client';

import Delete from '@/components/svgs/Delete';
import Edit from '@/components/svgs/Edit';
import { handleSubmitCall } from '@/helpers/handleSubmitCall';
import { estatesService } from '@/service/estates/estates.service';
import { IEstatesResponse } from '@/types/estates.type';
import Link from 'next/link';
import React from 'react';

interface Props {
   data: IEstatesResponse;
}

export default function ItemsList({ data }: Props) {
   const handleDelete = (id: number) => {
      handleSubmitCall({
         apiCall: () => estatesService.deleteEstate(id),
         setLoading: () => {},
         successMessage: 'Объявление успешно удалено',
         errorMessage: 'Ошибка при удалении объявления',
      });
   };

   return (
      <div className="p-6 min-h-screen bg-slate-50">
         <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
               <h1 className="text-2xl font-semibold text-slate-800">Список объявлений</h1>
            </div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
               <table className="w-full table-fixed text-sm">
                  <thead className="bg-gray-50">
                     <tr className="text-xs text-gray-500">
                        <th className="p-3 text-left w-12">ID</th>
                        <th className="p-3 text-left">Заголовок</th>
                        <th className="p-3 text-left w-40">Цена</th>
                        <th className="p-3 text-left w-32">Тип валюты</th>
                        <th className="p-3 text-left w-28">Пользователь</th>
                        <th className="p-3 text-right w-36">Действия</th>
                     </tr>
                  </thead>

                  <tbody>
                     {data.data.map((el) => (
                        <tr key={el.id} className="border-t hover:bg-gray-50">
                           <td className="p-3 text-slate-700">{el.id}</td>

                           <td className="p-3">
                              <div className="font-medium text-slate-800 line-clamp-1 max-w-md">{el.description}</div>
                              <div className="text-xs text-gray-400">Добавлено: {el.createdAt.slice(0, 10)}</div>
                           </td>
                           <td className="p-3 text-slate-700">{el.price}</td>
                           <td className="p-3 text-slate-700">{el.currencyType?.name}</td>
                           <td className="p-3 line-clamp-1">{el.user?.name}</td>

                           <td className="p-3 text-right">
                              <div className="inline-flex items-center gap-2 justify-end">
                                 {/* Edit button */}
                                 <Link
                                    href={`/estates/edit/${el.id}`}
                                    title="Редактировать"
                                    className="p-2 rounded-md hover:bg-indigo-50 focus:outline-none"
                                 >
                                    <Edit />
                                 </Link>

                                 {/* Delete button */}
                                 <button
                                    onClick={() => handleDelete(el.id)}
                                    title="Удалить"
                                    className="p-2 rounded-md hover:bg-red-50 focus:outline-none"
                                 >
                                    <Delete />
                                 </button>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
}
