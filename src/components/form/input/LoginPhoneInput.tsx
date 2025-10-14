import PhoneInput from 'react-phone-input-2';

interface Props {
   value: string;
   setValue: (value: string, phoneValue: string) => void;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   handleBlur: (e: React.FocusEvent<HTMLInputElement> | any) => void;
   touched: boolean | undefined;
   errorMsg: string | undefined;
}

const LoginPhoneInput: React.FC<Props> = ({ value, setValue, handleBlur, touched, errorMsg }) => {
   const inputClasses = `w-full rounded-lg border appearance-none h-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800`;

   return (
      <div className="relative">
         <PhoneInput
            containerClass={inputClasses}
            inputClass="focus:outline-none w-full h-full px-4"
            preferredCountries={['uz']}
            placeholder={'Номер телефона'}
            specialLabel=""
            inputProps={{
               name: 'phone',
            }}
            value={value}
            onChange={(v) => setValue('phone', v)}
            onFocus={() => {
               if (!value) {
                  setValue('phone', '+998');
               }
            }}
            onBlur={handleBlur}
         />
         {touched && <span className="text-14 text-red-500 absolute right-0 -bottom-12 h-full">{errorMsg}</span>}
      </div>
   );
};

export default LoginPhoneInput;
