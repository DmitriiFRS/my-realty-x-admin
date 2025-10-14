import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { ToastContainer } from 'react-toastify';
import NextTopLoader from 'nextjs-toploader';
import { AuthProvider } from '@/context/AuthContext';
import { cookies } from 'next/headers';

const outfit = Outfit({
   subsets: ['latin'],
});

export default async function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const cookieStore = await cookies();
   const token = cookieStore.get('admin-token')?.value;
   return (
      <html lang="en">
         <body className={`${outfit.className} dark:bg-gray-900`}>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={true} newestOnTop={true} />
            <NextTopLoader
               color="#0060AE"
               initialPosition={0.08}
               crawlSpeed={200}
               height={3}
               showSpinner={false}
               shadow="0 0 10px #fff,0 0 5px #fff"
            />
            <ThemeProvider>
               <AuthProvider token={token}>
                  <SidebarProvider>{children}</SidebarProvider>
               </AuthProvider>
            </ThemeProvider>
         </body>
      </html>
   );
}
