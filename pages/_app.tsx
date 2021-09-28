import type { AppProps } from 'next/app';

import 'tailwindcss/tailwind.css';
import { TerminalProvider } from '../components/TerminalProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TerminalProvider>
      <Component {...pageProps} />
    </TerminalProvider>
  );
}
export default MyApp;
