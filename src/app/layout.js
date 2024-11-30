
import "./globals.css";
export const metadata = {
  title: "Brain Battle",
  description: "A fun game to test your brain power",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
