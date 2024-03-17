import Wrapper from "@/components/layout/wrapper";
import "@/styles/globals.css";
import { ContextProvider } from "@/util/context";
import dotenv from 'dotenv';
import { SessionProvider } from "next-auth/react"

dotenv.config();

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ContextProvider>
        <Wrapper>
          <Component {...pageProps} />
          <script src="https://js.paystack.co/v1/inline.js"></script>
        </Wrapper>
      </ContextProvider>
    </SessionProvider>

  );
}
