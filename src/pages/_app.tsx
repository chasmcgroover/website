import type { AppProps } from 'next/app'
import Head from "next/head";
// add bootstrap css
import 'bootstrap/dist/css/bootstrap.css'
//custom css
import "../styles/styles.css"
import { MoralisProvider } from 'react-moralis';
//import "../css/customcss.css";
require('dotenv').config();

export default function App({ Component, pageProps }: AppProps) {
  
  let server = process.env.NEXT_PUBLIC_SERVER_URL || ""
  let id = process.env.NEXT_PUBLIC_APP_ID || ""
  
  return <MoralisProvider appId={id} serverUrl={server}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
    <Component {...pageProps} />
  </MoralisProvider>
}