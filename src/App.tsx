import { About, Services, WhyChooseUs } from "@/components/AboutServices";
import { BlogDialog, ContactDialog, FloatingActions, ProjectDialog, SearchDialog } from "@/components/Dialogs";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { FaqAndCta, TestimonialsAndPricing } from "@/components/Trust";
import { Portfolio, Process } from "@/components/Work";
import { SiteContext, useDialogState } from "@/lib/hooks";

export default function App() {
  const dialogs = useDialogState();

  return (
    <SiteContext.Provider value={dialogs}>
      <div className="min-h-screen overflow-x-clip bg-white">
        <Header />
        <main id="main-content">
          <Hero />
          <About />
          <Services />
          <WhyChooseUs />
          <Portfolio />
          <Process />
          <TestimonialsAndPricing />
          <FaqAndCta />
        </main>
        <Footer />
        <FloatingActions />
        <ContactDialog />
        <SearchDialog />
        <ProjectDialog />
        <BlogDialog />
      </div>
    </SiteContext.Provider>
  );
}
