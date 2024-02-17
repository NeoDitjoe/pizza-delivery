import Wrapper from "@/components/layout/wrapper";
import "@/styles/globals.css";
import dotenv from 'dotenv';
import { SessionProvider } from "next-auth/react"

dotenv.config();

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </SessionProvider>

  );
}
