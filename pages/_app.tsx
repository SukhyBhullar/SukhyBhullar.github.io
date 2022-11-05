import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from '@auth0/nextjs-auth0';

function MyApp({ Component, pageProps }: AppProps) {

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
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
