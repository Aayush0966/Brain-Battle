import LandingPage from "@/pages/LandingPage";

export const metadata = {
  title: "Brain Battle",
  description: "A fun game to test your brain power",
  icons: {
    icon: '/icon-192x192.png'  // Assuming your file is named icon.png
  }
};

export default function Page() {
  return <LandingPage />;
}
