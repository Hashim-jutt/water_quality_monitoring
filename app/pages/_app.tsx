import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Example of conditionally rendering a component based on the route
  if (router.pathname.startsWith('/details/')) {
    const PageComponent = require('../app/details/page').default;
    return <PageComponent {...pageProps} />;
  }

  return <Component {...pageProps} />;
}

export default MyApp;
