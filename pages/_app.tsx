import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from '@auth0/nextjs-auth0';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

function MyApp({ Component, pageProps }: AppProps) {

  const queryClient = new QueryClient()

  // if(!process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL)
  // {
  //   return (<div>NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL not set</div>);
  // }

  // if(!process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID)
  // {
  //   return (<div>NEXT_PUBLIC_AUTH0_CLIENT_ID not set</div>);
  // }

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      </QueryClientProvider>
    </UserProvider>
  );
}

export default MyApp;
