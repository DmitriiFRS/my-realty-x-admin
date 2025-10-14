'use client';

import { useAuth } from '@/context/AuthContext';
import { useSidebar } from '@/context/SidebarContext';
import UserDataContextProvider from '@/context/UserDataContextProvider';
import { useFetchData } from '@/hooks/useFetchData';
import AppHeader from '@/layout/AppHeader';
import AppSidebar from '@/layout/AppSidebar';
import Backdrop from '@/layout/Backdrop';
import { IUserDataWithRole } from '@/types/user.type';
import React from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
   const { isExpanded, isHovered, isMobileOpen } = useSidebar();
   const { token } = useAuth();

   // Dynamic class for main content margin based on sidebar state
   const mainContentMargin = isMobileOpen ? 'ml-0' : isExpanded || isHovered ? 'lg:ml-[290px]' : 'lg:ml-[90px]';

   const { data } = useFetchData<IUserDataWithRole>('users/get-me-admin', token);

   return (
      <div className="min-h-screen xl:flex">
         <UserDataContextProvider initialMe={data || null}>
            {/* Sidebar and Backdrop */}
            <AppSidebar />
            <Backdrop />
            {/* Main Content Area */}
            <div className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}>
               {/* Header */}
               <AppHeader />
               {/* Page Content */}
               <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">{children}</div>
            </div>
         </UserDataContextProvider>
      </div>
   );
}
