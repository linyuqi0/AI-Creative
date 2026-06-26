"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Smile,
  Sparkles,
  Download,
  RefreshCw,
  Type,
  Palette,
  User,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { generateEmoticon } from "@/lib/ai-service";

const textPresets = [
  "好的",
  "收到",
  "哈哈哈",
  "加油",
  "谢谢",
  "晚安",
  "冲鸭",
  "么么哒",
];

const stylePresets = [
  { id: "cartoon", name: "卡通风格", icon: "🎨" },
  { id: "cute", name: "可爱萌系", icon: "🐱" },
  { id: "meme", name: "沙雕搞怪", icon: "😂" },
  { id: "anime", name: "动漫风格", icon: "🎭" },
  { id: "pixel", name: "像素风格", icon: "👾" },
  { id: "realistic", name: "写实风格", icon: "📷" },
];

const characterPresets = [
  { id: "cat", name: "小猫咪", emoji: "🐱" },
  { id: "dog", name: "小狗狗", emoji: "🐶" },
  { id: "panda", name: "大熊猫", emoji: "🐼" },
  { id: "rabbit", name: "小兔子", emoji: "🐰" },
  { id: "bear", name: "小熊熊", emoji: "🐻" },
  { id: "human", name: "人物", emoji: "👤" },
];

const sampleEmoticons = [
  { id: "1", text: "好的呀", style: "可爱", image: "https://picsum.photos/seed/emote1/200/200" },
  { id: "2", text: "哈哈哈", style: "搞怪", image: "https://picsum.photos/seed/emote2/200/200" },
  { id: "3", text: "加油鸭", style: "励志", image: "https://picsum.photos/seed/emote3/200/200" },
  { id: "4", text: "么么哒", style: "可爱", image: "https://picsum.photos/seed/emote4/200/200" },
  { id: "5", text: "冲鸭", style: "励志", image: "https://picsum.photos/seed/emote5/200/200" },
  { id: "6", text: "晚安", style: "治愈", image: "https://picsum.photos/seed/emote6/200/200" },
];

export default function EmoticonsPage() {
  const [text, setText] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedEmoticon, setGeneratedEmoticon] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!text.trim()) return;
    setIsGenerating(true);
    setGeneratedEmoticon(null);
    try {
      const result = await generateEmoticon({
        text,
        style: selectedStyle,
        character: selectedCharacter,
      });
      setGeneratedEmoticon(result);
    } catch (error) {
      console.error("生成表情包失败:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 p-6 md:p-8"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
            <Smile className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">表情包工厂</h1>
            <p className="mt-2 text-muted-foreground">
              AI 智能生成个性化表情包，让你的聊天更有趣味。支持自定义文字、风格、角色
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold">生成表情包</h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Type className="h-4 w-4" />
                    表情包文字
                  </label>
                  <Input
                    placeholder="输入表情包上的文字，如：哈哈哈、好的、加油..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    maxLength={20}
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    {text.length}/20 字
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {textPresets.map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setText(preset)}
                      className="rounded-full bg-secondary px-3 py-1.5 text-sm text-secondary-foreground transition-colors hover:bg-secondary/80"
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Palette className="h-4 w-4" />
                    选择风格
                  </label>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                    {stylePresets.map((style) => (
                      <button
                        key={style.id}
                        onClick={() =>
                          setSelectedStyle(
                            selectedStyle === style.id ? "" : style.id
                          )
                        }
                        className={`flex flex-col items-center gap-1 rounded-xl border p-2 text-xs transition-colors ${
                          selectedStyle === style.id
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <span className="text-xl">{style.icon}</span>
                        <span>{style.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <User className="h-4 w-4" />
                    角色形象
                  </label>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                    {characterPresets.map((char) => (
                      <button
                        key={char.id}
                        onClick={() =>
                          setSelectedCharacter(
                            selectedCharacter === char.id ? "" : char.id
                          )
                        }
                        className={`flex flex-col items-center gap-1 rounded-xl border p-2 text-xs transition-colors ${
                          selectedCharacter === char.id
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <span className="text-xl">{char.emoji}</span>
                        <span>{char.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !text.trim()}
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
                      <Sparkles className="h-4 w-4" />
                      生成表情包
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {generatedEmoticon && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <h3 className="mb-4 font-semibold">生成结果</h3>
                  <div className="flex flex-col items-center gap-4">
                    <div className="overflow-hidden rounded-xl border bg-white p-4">
                      <img
                        src={generatedEmoticon}
                        alt="生成的表情包"
                        className="h-48 w-48 object-contain"
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={handleGenerate}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        换一张
                      </Button>
                      <Button>
                        <Download className="mr-2 h-4 w-4" />
                        下载
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <Heart className="h-5 w-5" />
                热门表情
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {sampleEmoticons.map((emote) => (
                  <div
                    key={emote.id}
                    className="group cursor-pointer overflow-hidden rounded-lg border transition-all hover:border-primary hover:shadow-md"
                    onClick={() => setText(emote.text)}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={emote.image}
                        alt={emote.text}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-2 text-center">
                      <p className="truncate text-xs font-medium">{emote.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="mb-3 text-lg font-semibold">小提示</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  文字建议控制在 2-6 个字效果最佳
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  选择与文字匹配的风格会更有趣
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  可以反复生成挑选最满意的一张
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  免费版每日限生成 20 张
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
