import { Sparkles } from "lucide-react";
import { CategoryPageTemplate } from "@/components/templates/CategoryPageTemplate";

export default function PromptsPage() {
  return (
    <CategoryPageTemplate
      title="AI 提示词社区"
      description="精选高质量提示词模板，一键复制，轻松生成完美作品。Midjourney、Stable Diffusion、DALL-E 全覆盖"
      icon={<Sparkles className="h-7 w-7" />}
      iconBg="bg-purple-50"
      iconColor="text-purple-600"
      category="提示词社区"
    />
  );
}
