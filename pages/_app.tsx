import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from '@auth0/nextjs-auth0';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

function MyApp({ Component, pageProps }: AppProps) {

  const queryClient = new QueryClient()
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      </QueryClientProvider>
    </UserProvider>
  );
}

export default MyApp;
