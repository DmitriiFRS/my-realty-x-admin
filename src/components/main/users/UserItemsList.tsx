'use client';

import Delete from '@/components/svgs/Delete';
import { handleSubmitCall } from '@/helpers/handleSubmitCall';
import { entitiesService } from '@/service/entities/entities.service';
import { IUserResponse } from '@/types/user.type';
import React, { useEffect } from 'react';

interface Props {
   slug: string;
}

export default function UserItemsList({ slug }: Props) {
   const [list, setList] = React.useState<IUserResponse | null>(null);
   useEffect(() => {
      const fetchData = async () => {
         const result = await entitiesService.getEntity(`users/role/${slug}`);
         console.log(result);
         setList(result);
      };
      fetchData();
   }, []);
   const handleDelete = async (id: number) => {
      // нужно реализовать предупреждение перед удалением от window.confirm
      const confirmed = window.confirm('Вы действительно хотите удалить юзера?');
      if (!confirmed) {
         return;
      }
      await handleSubmitCall({
         apiCall: () => entitiesService.deleteEntity('users/delete/' + id),
         setLoading: () => {},
         successMessage: 'Юзер успешно удален',
         errorMessage: 'Ошибка при удалении юзера',
      });
      window.location.reload();
   };

   return (
      list &&
      list.data && (
         <div className="p-6 min-h-screen bg-slate-50">
            <div className="max-w-6xl mx-auto">
               <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-semibold text-slate-800">Список Юзеров</h1>
               </div>
               <div className="bg-white rounded-lg shadow overflow-hidden">
                  <table className="w-full table-fixed text-sm">
                     <thead className="bg-gray-50">
                        <tr className="text-xs text-gray-500">
                           <th className="p-3 text-left w-12">ID</th>
                           <th className="p-3 text-left">Дата добавления</th>
                           <th className="p-3 text-left">Имя</th>
                           <th className="p-3 text-left w-40">Телефон</th>
                           <th className="p-3 text-left w-32">Рейтинг</th>
                           <th className="p-3 text-right w-36">Действия</th>
                        </tr>
                     </thead>

                     <tbody>
                        {list.data.map((el) => (
                           <tr key={el.id} className="border-t hover:bg-gray-50">
                              <td className="p-3 text-slate-700">{el.id}</td>

                              <td className="p-3">
                                 <div className="text-xs text-gray-400">Добавлено: {el.createdAt.slice(0, 10)}</div>
                              </td>
                              <td className="p-3 text-slate-700">{el.name}</td>
                              <td className="p-3 text-slate-700">{el.phone}</td>
                              <td className="p-3 text-slate-700">{el.rating}</td>

                              <td className="p-3 text-right">
                                 <div className="inline-flex items-center gap-2 justify-end">
                                    {/* Edit button */}
                                    {/* <Link
                                       href={`/estates/edit/${el.id}`}
                                       title="Редактировать"
                                       className="p-2 rounded-md hover:bg-indigo-50 focus:outline-none"
                                    >
                                       <Edit />
                                    </Link> */}

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
      )
   );
}
