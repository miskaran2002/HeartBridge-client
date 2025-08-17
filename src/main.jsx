import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

import {RouterProvider} from 'react-router'
import { router } from './Router/Router.jsx'
import AuthProvider from './contexts/AuthContext/AuthProvider.jsx';




createRoot(document.getElementById('root')).render(

  <StrictMode>
   <QueryClientProvider client={queryClient}>
      <AuthProvider>
       
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
   </QueryClientProvider>
   
  </StrictMode>,
)
