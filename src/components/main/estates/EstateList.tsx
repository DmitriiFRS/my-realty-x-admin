'use client';

import Delete from '@/components/svgs/Delete';
import Edit from '@/components/svgs/Edit';
import React from 'react';

type Ad = {
   id: number;
   title: string;
   location?: string;
   price?: string;
   status?: 'active' | 'draft' | 'sold';
   createdAt?: string;
};

interface Props {
   ads?: Ad[];
   onEdit?: (id: number) => void;
   onDelete?: (id: number) => void;
}

export default function AdminAdsList({ ads, onEdit, onDelete }: Props) {
   const sample: Ad[] = [
      { id: 1, title: 'Квартира в центре, 2 комнаты', location: 'Ташкент', price: '$45 000', status: 'active', createdAt: '2025-08-20' },
      { id: 2, title: 'Продам участок рядом с дорогой', location: 'Самарканд', price: '$12 000', status: 'draft', createdAt: '2025-07-10' },
      { id: 3, title: 'Комната в комфортабельной квартире', location: 'Нукус', price: '$6 500', status: 'sold', createdAt: '2025-06-01' },
   ];

   const list = ads ?? sample;

   const handleEdit = (id: number) => {
      if (onEdit) return onEdit(id);
      console.log('edit', id);
   };

   const handleDelete = (id: number) => {
      if (onDelete) return onDelete(id);
      console.log('delete', id);
   };

   return (
      <div className="p-6 min-h-screen bg-slate-50">
         <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
               <h1 className="text-2xl font-semibold text-slate-800">Список объявлений</h1>

               {/* <div className="flex items-center gap-3">
                  <label className="relative">
                     <input
                        type="search"
                        placeholder="Поиск по заголовку, локации..."
                        className="w-64 pl-10 pr-3 py-2 text-sm rounded-md border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
                     />
                     <svg
                        className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <circle
                           cx="11"
                           cy="11"
                           r="6"
                           stroke="currentColor"
                           strokeWidth="1.5"
                           strokeLinecap="round"
                           strokeLinejoin="round"
                        />
                     </svg>
                  </label>
               </div> */}
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
               <table className="w-full table-fixed text-sm">
                  <thead className="bg-gray-50">
                     <tr className="text-xs text-gray-500">
                        <th className="p-3 text-left w-12">#</th>
                        <th className="p-3 text-left">Заголовок</th>
                        <th className="p-3 text-left w-40">Локация</th>
                        <th className="p-3 text-left w-32">Цена</th>
                        <th className="p-3 text-left w-28">Статус</th>
                        <th className="p-3 text-right w-36">Действия</th>
                     </tr>
                  </thead>

                  <tbody>
                     {list.map((ad) => (
                        <tr key={ad.id} className="border-t hover:bg-gray-50">
                           <td className="p-3 text-slate-700">{ad.id}</td>

                           <td className="p-3">
                              <div className="font-medium text-slate-800 truncate max-w-md">{ad.title}</div>
                              <div className="text-xs text-gray-400">Добавлено: {ad.createdAt}</div>
                           </td>
                           <td className="p-3 text-slate-700">{ad.location}</td>
                           <td className="p-3 text-slate-700">{ad.price}</td>
                           <td className="p-3">
                              <span
                                 className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                    ad.status === 'active'
                                       ? 'bg-green-100 text-green-800'
                                       : ad.status === 'sold'
                                       ? 'bg-yellow-100 text-yellow-800'
                                       : 'bg-gray-100 text-gray-800'
                                 }`}
                              >
                                 {ad.status}
                              </span>
                           </td>

                           <td className="p-3 text-right">
                              <div className="inline-flex items-center gap-2 justify-end">
                                 {/* Edit button */}
                                 <button
                                    onClick={() => handleEdit(ad.id)}
                                    title="Редактировать"
                                    className="p-2 rounded-md hover:bg-indigo-50 focus:outline-none"
                                 >
                                    <Edit />
                                 </button>

                                 {/* Delete button */}
                                 <button
                                    onClick={() => handleDelete(ad.id)}
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
