import { Image } from "lucide-react";
import { CategoryPageTemplate } from "@/components/templates/CategoryPageTemplate";

export default function MaterialsPage() {
  return (
    <CategoryPageTemplate
      title="素材集市"
      description="海量优质 AI 生成素材，涵盖插画、图标、背景等多种类型，满足你的各种设计需求"
      icon={<Image className="h-7 w-7" />}
      iconBg="bg-blue-50"
      iconColor="text-blue-600"
      category="素材集市"
    />
  );
}
