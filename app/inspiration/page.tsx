import { Lightbulb } from "lucide-react";
import { CategoryPageTemplate } from "@/components/templates/CategoryPageTemplate";

export default function InspirationPage() {
  return (
    <CategoryPageTemplate
      title="灵感图库"
      description="每日精选创意灵感，激发你的无限想象与创作热情。从AI艺术到设计美学，应有尽有"
      icon={<Lightbulb className="h-7 w-7" />}
      iconBg="bg-pink-50"
      iconColor="text-pink-600"
      category="灵感图库"
    />
  );
}
