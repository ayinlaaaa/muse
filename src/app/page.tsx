import { PageWrapper } from "@/components/layout/page-wrapper";
import { Hero } from "@/components/landing/hero";
import { ProductPreview } from "@/components/chat/product-preview";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Features, FinalCTA } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <PageWrapper>
      <div className="min-h-screen">
        <Hero />
        <ProductPreview />
        <HowItWorks />
        <Features />
        <FinalCTA />
        <Footer />
      </div>
    </PageWrapper>
  );
}
