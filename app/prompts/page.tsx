"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Copy,
  RefreshCw,
  Wand2,
  BookOpen,
  Palette,
  Camera,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { generatePrompt } from "@/lib/ai-service";

const promptCategories = [
  { id: "portrait", name: "人物肖像", icon: User },
  { id: "landscape", name: "风景摄影", icon: Camera },
  { id: "illustration", name: "插画艺术", icon: Palette },
  { id: "concept", name: "概念艺术", icon: Wand2 },
];

const stylePresets = [
  "写实摄影",
  "赛博朋克",
  "水彩画",
  "油画风格",
  "动漫风格",
  "像素艺术",
  "3D渲染",
  "极简主义",
];

export default function PromptsPage() {
  const [topic, setTopic] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPrompts, setGeneratedPrompts] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim() && !selectedCategory) return;
    setIsGenerating(true);
    try {
      const prompts: string[] = [];
      for (let i = 0; i < 3; i++) {
        const prompt = await generatePrompt({
          topic: topic || selectedCategory,
          style: selectedStyle,
        });
        prompts.push(prompt);
      }
      setGeneratedPrompts(prompts);
    } catch (error) {
      console.error("生成提示词失败:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (error) {
      console.error("复制失败:", error);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 p-6 md:p-8"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
            <Sparkles className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">AI 提示词社区</h1>
            <p className="mt-2 text-muted-foreground">
              精选高质量提示词模板，一键复制，轻松生成完美作品。Midjourney、Stable Diffusion、DALL-E 全覆盖
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold">AI 提示词生成器</h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-muted-foreground">
                    描述你想要生成的内容
                  </label>
                  <Input
                    placeholder="例如：一只可爱的猫咪在月光下的森林里..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-muted-foreground">
                    选择分类
                  </label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {promptCategories.map((cat) => {
                      const Icon = cat.icon;
                      return (
                        <button
                          key={cat.id}
                          onClick={() =>
                            setSelectedCategory(
                              selectedCategory === cat.id ? "" : cat.id
                            )
                          }
                          className={`flex flex-col items-center gap-2 rounded-xl border p-3 text-sm transition-colors ${
                            selectedCategory === cat.id
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          <span>{cat.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-muted-foreground">
                    风格预设
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {stylePresets.map((style) => (
                      <button
                        key={style}
                        onClick={() =>
                          setSelectedStyle(
                            selectedStyle === style ? "" : style
                          )
                        }
                        className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                          selectedStyle === style
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || (!topic.trim() && !selectedCategory)}
                  className="w-full"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      生成中...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4" />
                      生成提示词
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {generatedPrompts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h2 className="text-lg font-semibold">生成结果</h2>
              {generatedPrompts.map((prompt, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-2">
                      <span className="text-sm font-medium">
                        提示词 {index + 1}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(prompt, index)}
                      >
                        {copiedIndex === index ? (
                          <>
                            <Copy className="mr-1 h-3.5 w-3.5" />
                            已复制
                          </>
                        ) : (
                          <>
                            <Copy className="mr-1 h-3.5 w-3.5" />
                            复制
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="p-4">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {prompt}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <BookOpen className="h-5 w-5" />
                编写技巧
              </h2>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>主体描述：明确你想要的核心内容</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>风格定义：艺术风格、媒介、时期</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>光线氛围：自然光、电影光、霓虹等</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>构图视角：特写、全景、鸟瞰等</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>画质参数：8K、高清、细节丰富等</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold">热门标签</h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "写实",
                  "梦幻",
                  "科幻",
                  "古风",
                  "可爱",
                  "暗黑",
                  "治愈",
                  "史诗",
                  "复古",
                  "未来",
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setTopic(tag)}
                    className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
