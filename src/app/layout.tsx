import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { ToastContainer } from 'react-toastify';
import NextTopLoader from 'nextjs-toploader';

const outfit = Outfit({
   subsets: ['latin'],
});

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
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
               <SidebarProvider>{children}</SidebarProvider>
            </ThemeProvider>
         </body>
      </html>
   );
}
