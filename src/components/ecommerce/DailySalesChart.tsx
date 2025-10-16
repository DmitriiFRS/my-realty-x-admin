/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import { DropdownItem } from '../ui/dropdown/DropdownItem';
import { useState } from 'react';
import { Dropdown } from '../ui/dropdown/Dropdown';
import { useFetchData } from '@/hooks/useFetchData';

// динамический импорт чарта (без SSR)
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
   ssr: false,
});

function getDaysInMonth(year: number, monthIndex: number) {
   // monthIndex: 0..11
   return new Date(year, monthIndex + 1, 0).getDate();
}

function normalizeDailyData(raw: any, daysCount: number): number[] {
   // Возвращаем массив длины daysCount, заполненный числами.
   if (!raw) return Array(daysCount).fill(0);
   if (!Array.isArray(raw)) return Array(daysCount).fill(0);

   if (raw.length === 0) return Array(daysCount).fill(0);

   // 1) Если это просто массив чисел
   if (typeof raw[0] === 'number') {
      const arr = Array(daysCount).fill(0);
      for (let i = 0; i < Math.min(raw.length, daysCount); i++) {
         arr[i] = Number(raw[i] ?? 0);
      }
      return arr;
   }

   // 2) Если это массив объектов — попробуем разные форматы:
   // { day: number, count: number } or { date: '2025-10-01', value: number } or { x: '2025-10-01', y: number }
   const map = new Map<number, number>();
   raw.forEach((item: any) => {
      if (!item) return;
      // format: { day, count }
      if (item.day != null) {
         map.set(Number(item.day), Number(item.count ?? item.value ?? item.y ?? 0));
         return;
      }
      // format: { date: '2025-10-01', value: 5 }
      if (item.date) {
         const d = new Date(item.date);
         if (!isNaN(d.getTime())) {
            map.set(d.getDate(), Number(item.value ?? item.count ?? item.y ?? item.amount ?? 0));
            return;
         }
      }
      // format: { x: '2025-10-01', y: 5 } (apex-style)
      if (item.x && item.y != null) {
         const d = new Date(item.x);
         if (!isNaN(d.getTime())) {
            map.set(d.getDate(), Number(item.y));
            return;
         }
      }
      // fallback: try keys 'day' or index-like keys
      if (item.dayOfMonth != null) {
         map.set(Number(item.dayOfMonth), Number(item.count ?? item.value ?? 0));
      }
   });

   const result = Array.from({ length: daysCount }, (_, i) => map.get(i + 1) ?? 0);
   return result;
}

export default function DailySalesChart({ title, endpoint, token }: { title: string; endpoint: string; token: string | undefined }) {
   // Изменил endpoint на 'estates/daily' — если у вас API по-другому, поменяйте.
   const { data, isLoading, error } = useFetchData<any[]>(endpoint, token);

   const now = new Date();
   const year = now.getFullYear();
   const monthIndex = now.getMonth(); // 0..11
   const daysCount = getDaysInMonth(year, monthIndex);
   const categories = Array.from({ length: daysCount }, (_, i) => `${i + 1}`);

   // Нормализуем данные в числа для чарта
   const seriesData = normalizeDailyData(data, daysCount);

   const options: ApexOptions = {
      chart: {
         fontFamily: 'Outfit, sans-serif',
         type: 'bar',
         height: 220,
         toolbar: { show: false },
      },
      plotOptions: {
         bar: {
            horizontal: false,
            borderRadius: 6,
            // не жёстко задаём columnWidth — пусть apex сам распределит; можно менять если нужно
         },
      },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 2, colors: ['transparent'] },
      xaxis: {
         categories,
         axisBorder: { show: false },
         axisTicks: { show: false },
         labels: {
            rotate: -45,
            rotateAlways: true,
            formatter: (val: string) => `${val}`, // просто номер дня
         },
      },
      yaxis: { title: { text: undefined } },
      grid: {
         yaxis: { lines: { show: true } },
      },
      fill: { opacity: 1 },
      tooltip: {
         x: { show: true },
         y: {
            formatter: (val: number) => `${val}`,
         },
      },
      legend: {
         show: false,
      },
   };

   const series = [
      {
         name: 'Объявлений',
         data: seriesData,
      },
   ];

   const [isOpen, setIsOpen] = useState(false);
   function closeDropdown() {
      setIsOpen(false);
   }

   if (!data && !isLoading) {
      return <div className="text-center text-gray-500">Нет данных</div>;
   }
   if (isLoading) {
      return <div className="text-center text-gray-500">Загрузка...</div>;
   }
   if (error) {
      return <div className="text-center text-red-500">Ошибка при загрузке данных: {String(error)}</div>;
   }

   // рассчитываем минимальную ширину под количество дней (чтобы столбцы не слипались)
   const minWidthPx = Math.max(650, daysCount * 28); // ~28px на день — подберите по вкусу

   return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
         <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">{title}</h3>

            <div className="relative inline-block">
               <Dropdown isOpen={isOpen} onClose={closeDropdown} className="w-40 p-2">
                  <DropdownItem
                     onItemClick={closeDropdown}
                     className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                  >
                     View More
                  </DropdownItem>
                  <DropdownItem
                     onItemClick={closeDropdown}
                     className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                  >
                     Delete
                  </DropdownItem>
               </Dropdown>
            </div>
         </div>

         <div className="max-w-full overflow-x-auto custom-scrollbar">
            <div className="-ml-5 pl-2" style={{ minWidth: `${minWidthPx}px` }}>
               {seriesData && seriesData.length > 0 && <ReactApexChart options={options} series={series} type="bar" height={220} />}
            </div>
         </div>
      </div>
   );
}
