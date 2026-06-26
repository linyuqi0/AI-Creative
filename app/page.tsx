import { HeroSection } from "@/components/sections/HeroSection";
import { ToolsSection } from "@/components/sections/ToolsSection";
import { CreativeCollection } from "@/components/sections/CreativeCollection";

export default function HomePage() {
  return (
    <div className="space-y-8 md:space-y-10">
      <HeroSection />
      <ToolsSection />
      <CreativeCollection />
    </div>
  );
}
