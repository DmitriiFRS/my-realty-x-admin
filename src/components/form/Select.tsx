import React from 'react';
import { FieldError } from 'react-hook-form';

interface Option {
   slug: string;
   name: string;
   id: number | string;
}

interface SelectProps {
   options: Option[];
   placeholder?: string;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   onChange: (...event: any[]) => void;
   className?: string;
   value: number | string | undefined;
   error: FieldError | undefined;
}

const Select: React.FC<SelectProps> = ({ options, placeholder = 'Выберите', onChange, className = '', value, error }) => {
   return (
      <select
         className={`h-11 w-full appearance-none rounded-lg border px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3
         dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30
         ${className}
         ${
            !error
               ? 'border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700 dark:focus:border-brand-800' // ✅ Стили для ОБЫЧНОГО состояния
               : 'border-error-300 text-error-500 focus:border-error-300 focus:ring-error-500/10 dark:border-error-700 dark:focus:border-error-800' // ❌ Стили для СОСТОЯНИЯ ОШИБКИ
         }`}
         value={value ?? ''}
         onChange={onChange}
      >
         {/* Placeholder option */}
         <option value="" disabled className="text-gray-700 dark:bg-gray-900 dark:text-gray-400">
            {placeholder}
         </option>
         {/* Map over options */}
         {options.map((option) => (
            <option key={option.id} value={option.id} className="text-gray-700 dark:bg-gray-900 dark:text-gray-400">
               {option.name}
            </option>
         ))}
      </select>
   );
};

export default Select;
