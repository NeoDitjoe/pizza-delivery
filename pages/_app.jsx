import Wrapper from "@/components/layout/wrapper";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Wrapper>
      <Component {...pageProps} />
    </Wrapper>
  );
}
