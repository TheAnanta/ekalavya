import { AuthContextProvider } from "@/context/AuthContext";
import "./globals.css";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="use-credentials"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Google+Sans:400,500,700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="shortcut icon"
          href="https://www.gstatic.com/devrel-devsite/prod/ve5ef9ac7b497e19ece9427facc78d0c59aaab7a2bc6a0f75fdae93f4ee589f67/android/images/favicon.svg"
        />
        <title>#Ekalavya</title>
        <meta
          name="description"
          content="#NamastheAndroid is a online self-study program to help developers to learn Android Development using the Compose. You will learn basic Android programming with best practices recommended by the Android team, including creating beautiful layouts, architecting navigations between screens and connecting to the internet.
          Get your exclusive and adorable SWAG!"
        />
        <meta name="tags" content="" />
        <link
          href="https://fonts.googleapis.com/css?family=Google+Sans+Display:400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`antialiased`}>
        <AuthContextProvider>
          <>{children}</>
        </AuthContextProvider>
        {/* <Script src="https://accounts.google.com/gsi/client"></Script> */}
      </body>
    </html>
  );
}
