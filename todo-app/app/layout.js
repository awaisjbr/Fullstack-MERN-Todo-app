import Navbar from "@/components/Navbar";
import "./globals.css";


export const metadata = {
  title: "Todo-App",
  description: "FullStack MERN Todo-app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
