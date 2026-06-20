import Banner from "./_home/Banner.jsx";
import Advertisement from "./_home/Advertisement.jsx";
import LatestTickets from "./_home/LatestTickets.jsx";
import PopularRoutes from "./_home/PopularRoutes.jsx";
import WhyChooseUs from "./_home/WhyChooseUs.jsx";

export default function Home() {
  return (
    <div>
      <Banner />
      <Advertisement />
      <LatestTickets />
      <PopularRoutes />
      <WhyChooseUs />
    </div>
  );
}
