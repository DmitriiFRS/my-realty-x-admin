'use client';

import { IUserDataWithRole } from '@/types/user.type';
import { createContext, PropsWithChildren, useEffect, useState } from 'react';

export const UserData = createContext<{
   me: IUserDataWithRole | null;
   setMe: (me: IUserDataWithRole | null) => void;
}>({
   me: null,
   setMe: () => {},
});

interface UserDataContextProviderProps extends PropsWithChildren {
   initialMe: IUserDataWithRole | null;
}

const UserDataContextProvider = ({ children, initialMe }: UserDataContextProviderProps) => {
   const [me, setMe] = useState<IUserDataWithRole | null>(initialMe);

   useEffect(() => {
      setMe(initialMe);
   }, [initialMe]);

   return <UserData.Provider value={{ me, setMe }}>{children}</UserData.Provider>;
};

export default UserDataContextProvider;
