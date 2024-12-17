import BoardingPage from "@/pages/BoardingPage";

export const metadata = {
    title: "Brain Battle || Home",
    description: "A fun game to test your brain power",
    icons: {
      icon: '/icon-192x192.png'  
    }
  };
  


const page = () => {
    return (
       <BoardingPage />
    )
}
export default page
