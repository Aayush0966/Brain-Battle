import React from 'react'
import GamePage from "@/pages/GamePage";

export const metadata = {
    title: "Brain Battle || Game",
    description: "A fun game to test your brain power",
    icons: {
      icon: '/icon-192x192.png'
    }
  };
  

const Page = () => {
    return (
        <GamePage />
    )
}
export default Page
