import { LanguageProvider } from "./LanguageContext";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { Services } from "./Services";
import { AboutUs } from "./AboutUs";
import { Destinations } from "./Destinations";
import { Stats } from "./Stats";
import { Testimonials } from "./Testimonials";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { FloatingWhatsApp } from "./FloatingWhatsApp";

export function LandingPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
        <Navbar />
        <Hero />
        <Services />
        <AboutUs />
        <Destinations />
        <Stats />
        <Testimonials />
        <Contact />
        <Footer />
        <FloatingWhatsApp />
      </div>
    </LanguageProvider>
  );
}
