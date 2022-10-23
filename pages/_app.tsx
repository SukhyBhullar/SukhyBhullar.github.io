import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Auth0Provider } from "@auth0/auth0-react";

function MyApp({ Component, pageProps }: AppProps) {

  if(!process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL)
  {
    return (<div>NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL not set</div>);
  }

  if(!process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID)
  {
    return (<div>NEXT_PUBLIC_AUTH0_CLIENT_ID not set</div>);
  }

  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      redirectUri={process.env.NEXT_PUBLIC_AUTH0_BASE_URL}
    >
      <Component {...pageProps} />
    </Auth0Provider>
  );
}

export default MyApp;
