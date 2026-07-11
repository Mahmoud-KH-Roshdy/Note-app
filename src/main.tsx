import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import UiContextProvider from './context/UiContext.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ToasterStyling from './components/ToasterStyling.tsx';

  const queryClient = new QueryClient();


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
    <UiContextProvider>
    <App />
    </UiContextProvider>
    </QueryClientProvider>
    <ToasterStyling/>
  </StrictMode>,
)
