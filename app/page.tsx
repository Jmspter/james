import About from "@/components/About";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import WhyChooseMe from "@/components/WhyChooseMe";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Hero />
      <About />
      <Process />
      <WhyChooseMe />
      <Projects />
      <Footer />
    </main>
  );
}
