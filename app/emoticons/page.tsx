import { Smile } from "lucide-react";
import { CategoryPageTemplate } from "@/components/templates/CategoryPageTemplate";

export default function EmoticonsPage() {
  return (
    <CategoryPageTemplate
      title="表情包工厂"
      description="AI 智能生成个性化表情包，让你的聊天更有趣味。支持自定义文字、风格、角色"
      icon={<Smile className="h-7 w-7" />}
      iconBg="bg-amber-50"
      iconColor="text-amber-600"
      category="表情包工厂"
    />
  );
}
