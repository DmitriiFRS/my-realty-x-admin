import { createPortal } from 'react-dom';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FieldError, FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form';
import Loader from '../common/Loader';
import { commonService } from '@/service/common.service';

interface Props<T extends FieldValues> {
   name: Path<T>;
   setValue: UseFormSetValue<T>;
   searchValue: string;
   setSearchValue: (value: string) => void;
   placeholder?: string;
   isDisabled?: boolean;
   error?: FieldError | undefined;
   className?: string;
   inputClassName?: string;
}

const SearchDropdownInput = <T extends FieldValues>({
   error,
   name,
   setValue,
   searchValue,
   setSearchValue,
   placeholder,
   isDisabled,
   className,
   inputClassName,
}: Props<T>) => {
   const wrapperRef = useRef<HTMLDivElement | null>(null);
   const portalRef = useRef<HTMLDivElement | null>(null);
   const [loading, setLoading] = useState(false);
   const [coords, setCoords] = useState<{ left: number; top: number; width: number; bottom: number } | null>(null);
   const [isOpen, setIsOpen] = useState(false);
   const [searchedItems, setSearchedItems] = useState<{ id: number; phoneName: string }[]>([]);

   useEffect(() => {
      const fetchSearchedItems = async () => {
         try {
            setLoading(true);
            const data = await commonService.getSearchedItems(searchValue);
            console.log(data);
            if (data.users) setSearchedItems(data.users);
         } catch (error) {
            console.error('Error setting loading state:', error);
         } finally {
            setLoading(false);
         }
      };
      if (searchValue.length < 2) return setSearchedItems([]);
      fetchSearchedItems();
   }, [searchValue]);

   const recalc = () => {
      if (!wrapperRef.current) return setCoords(null);
      const rect = wrapperRef.current.getBoundingClientRect();
      setCoords({
         left: rect.left + window.scrollX,
         top: rect.top + window.scrollY,
         bottom: rect.bottom + window.scrollY,
         width: rect.width,
      });
   };

   useLayoutEffect(() => {
      if (isOpen) recalc();
   }, [isOpen]);

   useEffect(() => {
      if (!isOpen) return;
      const handleScroll = (event: Event) => {
         if (portalRef.current && portalRef.current.contains(event.target as Node)) {
            return;
         }
         recalc();
      };
      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', recalc);

      return () => {
         window.removeEventListener('scroll', handleScroll, true);
         window.removeEventListener('resize', recalc);
      };
   }, [isOpen]);

   const DropdownPortal = () => {
      if (!coords || !isOpen) return null;
      const style: React.CSSProperties = {
         position: 'absolute',
         left: coords.left,
         top: coords.bottom + 4,
         width: coords.width,
         zIndex: 9999,
      };

      function handleClick(userName: string, id: number) {
         setSearchValue(userName);
         setValue(name as Path<T>, id as PathValue<T, typeof name>, { shouldValidate: true });
      }

      return createPortal(
         <div ref={portalRef} style={style} className={`${className}`}>
            <div className="bg-white rounded shadow-sm max-h-60 overflow-auto">
               {loading ? (
                  <div className="p-3 text-[14px]">
                     <Loader className="size-4" />
                  </div>
               ) : searchedItems.length === 0 ? (
                  <div className="p-3 text-sm">Ничего не найдено</div>
               ) : (
                  <ul>
                     {searchedItems.map((opt, index) => {
                        return (
                           <li key={index} className=" hover:bg-gray-100 cursor-pointer">
                              <button className="px-3 py-2 w-full h-full text-left" onClick={() => handleClick(opt.phoneName, opt.id)}>
                                 {opt.phoneName}
                              </button>
                           </li>
                        );
                     })}
                  </ul>
               )}
            </div>
         </div>,
         document.body
      );
   };

   return (
      <div>
         <div className="relative" ref={wrapperRef}>
            <input
               disabled={isDisabled}
               value={searchValue}
               onChange={(e) => setSearchValue(e.target.value)}
               onFocus={() => setIsOpen(true)}
               onBlur={() => {
                  setTimeout(() => {
                     setIsOpen(false);
                  }, 150);
               }}
               type="text"
               placeholder={placeholder}
               className={`px-2 py-[2px] border border-[#00000014] h-[35px] text-14 rounded-lg w-full duration-300 focus:border-black ${
                  isDisabled ? 'text-[#d1d1d1]' : ''
               } ${error ? 'border-error-red' : ''} ${inputClassName}`}
            />
            <DropdownPortal />
         </div>
      </div>
   );
};

export default SearchDropdownInput;
