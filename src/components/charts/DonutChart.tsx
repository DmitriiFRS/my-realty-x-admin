'use client';

import React from 'react';
import Chart from 'react-apexcharts';

export interface ApexDonutSegment {
   id: number;
   name: string;
   value: number;
   color?: string;
}

interface SessionsByCategoryDonutProps {
   data: ApexDonutSegment[];
   height?: number | string;
   width?: number | string;
}

const defaultColors = ['#3b5bfd', '#8098ff', '#dfe8ff', '#7ae0b6'];

export default function SessionsByCategoryDonut({ data, height = 360, width = '100%' }: SessionsByCategoryDonutProps) {
   const labels = data.map((item) => item.name);
   const series = data.map((item) => item.value);
   const colors = data.map((item, index) => item.color ?? defaultColors[index % defaultColors.length]);

   const options: ApexCharts.ApexOptions = {
      chart: {
         type: 'donut',
         toolbar: { show: false },
      },
      labels,
      colors,
      legend: {
         position: 'bottom',
         horizontalAlign: 'center',
         fontSize: '14px',
         markers: { strokeWidth: 0 },
      },
      tooltip: {
         y: {
            formatter(value: number) {
               return `${value}`;
            },
         },
      },
      plotOptions: {
         pie: {
            expandOnClick: false,
            donut: {
               size: '65%',
               labels: {
                  show: true,
                  name: { show: true, fontSize: '16px' },
                  value: { show: true, fontSize: '14px' },
                  total: {
                     show: true,
                     showAlways: true,
                     label: 'Итого',
                     // eslint-disable-next-line @typescript-eslint/no-explicit-any
                     formatter(w: any) {
                        const sum = w.globals.seriesTotals.reduce((acc: number, cur: number) => acc + cur, 0);
                        return String(sum);
                     },
                  },
               },
            },
         },
      },
      responsive: [
         {
            breakpoint: 480,
            options: {
               chart: { width: 300 },
               legend: { position: 'bottom' },
            },
         },
      ],
   };

   return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 w-full max-w-3xl">
         <div className="flex items-start justify-between mb-6">
            <h3 className="text-2xl font-semibold text-gray-800">Категории</h3>
         </div>

         <div>
            <Chart options={options} series={series} type="donut" width={width} height={height} />
         </div>
      </div>
   );
}
