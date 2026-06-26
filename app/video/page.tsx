import { Video } from "lucide-react";
import { CategoryPageTemplate } from "@/components/templates/CategoryPageTemplate";

export default function VideoPage() {
  return (
    <CategoryPageTemplate
      title="数字人视频生成"
      description="AI 驱动的数字人视频制作，一句话生成专业视频。多种数字人形象，支持自定义语音和场景"
      icon={<Video className="h-7 w-7" />}
      iconBg="bg-emerald-50"
      iconColor="text-emerald-600"
      category="数字人视频"
    />
  );
}
