import { Hero } from "@/components/sections/Hero";
import { Gallery } from "@/components/sections/Gallery";
import { ContactSection } from "@/components/sections/ContactSection";
import { VisualServices } from "@/components/sections/VisualServices";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <Hero />
      <VisualServices />
      <Gallery />
      <Testimonials />
      <ContactSection />
    </main>
  );
}
