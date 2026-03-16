import HeroBanner from "@/components/home/HeroBanner";
import QuickStatsBar from "@/components/home/QuickStatsBar";
import NextMatchCard from "@/components/home/NextMatchCard";
import LatestResults from "@/components/home/LatestResults";
import LatestNews from "@/components/home/LatestNews";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <QuickStatsBar />
      <NextMatchCard />
      <LatestResults />
      <LatestNews />
    </>
  );
}
