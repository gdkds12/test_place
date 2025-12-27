import Hero from "./components/Hero";
import CardStack from "./components/CardStack";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <CardStack />
      <Footer />
    </main>
  );
}