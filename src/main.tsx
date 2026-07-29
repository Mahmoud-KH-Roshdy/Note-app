import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import UiContextProvider from './context/UiContext.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ToasterStyling from './components/ToasterStyling.tsx';

import App from './App.tsx';
import AuthProvider from './context/AuthContext.tsx';

  const queryClient = new QueryClient();


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AuthProvider>
    <UiContextProvider>
    <App/>
    </UiContextProvider>
    </AuthProvider>
    </QueryClientProvider>
    <ToasterStyling/>
  </StrictMode>,
)
