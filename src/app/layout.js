import "./globals.css";
import { Inter } from 'next/font/google'
import ConditionalHeader from './components/ConditionalHeader'
import { ThemeProvider } from './hooks/useTheme'

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
