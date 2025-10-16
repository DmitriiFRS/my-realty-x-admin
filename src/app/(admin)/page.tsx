import type { Metadata } from 'next';
import { EcommerceMetrics } from '@/components/ecommerce/EcommerceMetrics';
import React from 'react';
import MonthlySalesChart from '@/components/ecommerce/MonthlySalesChart';
import { cookies } from 'next/headers';
import { commonService } from '@/service/common.service';
import DailySalesChart from '@/components/ecommerce/DailySalesChart';

export const metadata: Metadata = {
   title: 'Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template',
   description: 'This is Next.js Home for TailAdmin Dashboard Template',
};

export default async function Ecommerce() {
   const cookieStore = await cookies();
   const token = cookieStore.get('admin-token')?.value;
   const { data: usersData } = await commonService.getData('users/count', token);
   const { data: estatedData } = await commonService.getData('estates/count', token);
   const { data: chartData } = await commonService.getData('admin-analytics/categories', token);
   console.log(chartData);
   return (
      <div className="grid grid-cols-12 gap-4 md:gap-6">
         <div className="col-span-12 space-y-6 xl:col-span-10">
            <EcommerceMetrics userCount={usersData?.count} estateCount={estatedData?.count} chartData={chartData?.data} />
            <div className="grid grid-cols-1 gap-5">
               <MonthlySalesChart token={token} />
               <DailySalesChart title="Объявлений за текущий месяц" endpoint="admin-analytics/estates-daily" token={token} />
               <DailySalesChart title="Новых пользователей за текущий месяц" endpoint="admin-analytics/users-daily" token={token} />
            </div>
         </div>

         {/* <div className="col-span-12 xl:col-span-5">
            <MonthlyTarget />
         </div> */}

         {/* <div className="col-span-12">
            <StatisticsChart />
         </div>

         <div className="col-span-12 xl:col-span-5">
            <DemographicCard />
         </div>

         <div className="col-span-12 xl:col-span-7">
            <RecentOrders />
         </div> */}
      </div>
   );
}
