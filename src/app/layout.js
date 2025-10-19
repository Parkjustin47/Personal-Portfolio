import "./globals.css";
import { Inter } from 'next/font/google'
import ConditionalHeader from './components/ConditionalHeader'
import { ThemeProvider } from './hooks/useTheme'
// import Script from "next/script";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Justin's Portfolio",
  description: "Justin's portfolio",
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  }
};

export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
      {/* <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1B8lmO8U4EY5GmhrHu8H9A6B6R9Xj6j1LRG/HRR9aYmrD8+8K1xC3V9Q+ihsZp6lMQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head> */}
      <body
        className={inter.className}
      >
        <ThemeProvider>
          <ConditionalHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
