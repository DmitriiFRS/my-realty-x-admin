'use client';
import React from 'react';
import { BoxIconLine, GroupIcon } from '@/icons';
import dynamic from 'next/dynamic';

interface Props {
   userCount: number | undefined;
   estateCount: number | undefined;
   chartData: { id: number; name: string; value: number }[] | undefined;
}

const SessionsByCategoryDonut = dynamic(() => import('../charts/DonutChart'), {
   ssr: false,
   loading: () => <div>Загрузка графика...</div>,
});

export const EcommerceMetrics = ({ userCount, estateCount, chartData }: Props) => {
   return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
         {/* <!-- Metric Item Start --> */}
         <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
               <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
            </div>

            {userCount && (
               <div className="flex items-end justify-between mt-5">
                  <div>
                     <span className="text-sm text-gray-500 dark:text-gray-400">Пользователей</span>
                     <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">{userCount}</h4>
                  </div>
                  {/* <Badge color="success">
                     <ArrowUpIcon />
                     11.01%
                  </Badge> */}
               </div>
            )}
         </div>
         {/* <!-- Metric Item End --> */}

         {/* <!-- Metric Item Start --> */}
         {estateCount && (
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
               <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                  <BoxIconLine className="text-gray-800 dark:text-white/90" />
               </div>
               <div className="flex items-end justify-between mt-5">
                  <div>
                     <span className="text-sm text-gray-500 dark:text-gray-400">Недвижимости</span>
                     <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">{estateCount}</h4>
                  </div>

                  {/* <Badge color="error">
                     <ArrowDownIcon className="text-error-500" />
                     9.05%
                  </Badge> */}
               </div>
            </div>
         )}
         {/* <!-- Metric Item End --> */}
         {chartData && chartData.length && <SessionsByCategoryDonut data={chartData} />}
      </div>
   );
};
