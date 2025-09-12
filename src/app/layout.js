import "./globals.css";
import "./style.css";
import { CartProvider } from "../context/addToCart";
import LoaderWrapper from "../components/LoaderWrapper/LoaderWrapper";

export const metadata = {
  title: "Delco Farmers Market",
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
        <title>{metadata.title}</title>
      </head>
      <body>
        <CartProvider>
          <LoaderWrapper>
            <main className="site-main">{children}</main>
          </LoaderWrapper>
        </CartProvider>
      </body>
    </html>
  );
}
