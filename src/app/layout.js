import "./globals.css";
import "./style.css";
import { CartProvider } from "../context/addToCart";
import LoaderWrapper from "../components/LoaderWrapper/LoaderWrapper";
import { Geist, Geist_Mono, Baloo_Bhai_2, Poppins } from "next/font/google";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const balooBhai = Baloo_Bhai_2({
  variable: "--font-baloo-bhai",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});



export const metadata = {
  title: "Grocery - Delco Farmers Market",
  description: "Fresh produce and groceries from Delco Farmers Market.",
  icons: {
    icon: "/edit-logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDUMMY1234567890"
        async
        defer
      ></script>

      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/edit-logo.png" type="image/png" />
        <title>Grocery - Delco Farmers Market</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${balooBhai.variable} ${poppins.variable}`}>
        <CartProvider>
          <LoaderWrapper>
            <main className="site-main">{children}</main>
          </LoaderWrapper>
        </CartProvider>
      </body>
    </html>
  );
}


