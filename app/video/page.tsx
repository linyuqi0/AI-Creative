"use client";

import { Video, Sparkles, Loader2, Play, Download, RefreshCw, User, Mic } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { generateVideoScript } from "@/lib/ai-service";

const avatarPresets = [
  { id: "1", name: "知性女主播", image: "https://picsum.photos/seed/avatar1/200/200" },
  { id: "2", name: "商务男士", image: "https://picsum.photos/seed/avatar2/200/200" },
  { id: "3", name: "可爱少女", image: "https://picsum.photos/seed/avatar3/200/200" },
  { id: "4", name: "活力少年", image: "https://picsum.photos/seed/avatar4/200/200" },
  { id: "5", name: "气质女神", image: "https://picsum.photos/seed/avatar5/200/200" },
  { id: "6", name: "儒雅学者", image: "https://picsum.photos/seed/avatar6/200/200" },
];

const voicePresets = [
  { id: "female1", name: "甜美女声" },
  { id: "female2", name: "知性女声" },
  { id: "male1", name: "磁性男声" },
  { id: "male2", name: "阳光男声" },
];

const sceneTemplates = [
  "产品介绍",
  "知识科普",
  "新闻播报",
  "情感语录",
  "教学讲解",
  "企业宣传",
];

export default function VideoPage() {
  const [topic, setTopic] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScript, setGeneratedScript] = useState<string | null>(null);
  const [step, setStep] = useState<"script" | "generate" | "result">("script");

  const handleGenerateScript = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    try {
      const script = await generateVideoScript(topic);
      setGeneratedScript(script);
      setStep("generate");
    } catch (error) {
      console.error("生成脚本失败:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateVideo = () => {
    if (!selectedAvatar || !selectedVoice) return;
    setIsGenerating(true);
    setStep("result");
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 p-6 md:p-8"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
            <Video className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">数字人视频生成</h1>
            <p className="mt-2 text-muted-foreground">
              AI 驱动的数字人视频制作，一句话生成专业视频。多种数字人形象，支持自定义语音和场景
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {[
                    { step: "script", label: "编写脚本" },
                    { step: "generate", label: "选择形象" },
                    { step: "result", label: "生成视频" },
                  ].map((s, i) => (
                    <div key={s.step} className="flex items-center">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                          step === s.step
                            ? "bg-primary text-primary-foreground"
                            : i < ["script", "generate", "result"].indexOf(step)
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {i + 1}
                      </div>
                      <span
                        className={`ml-2 text-sm ${
                          step === s.step ? "font-medium" : "text-muted-foreground"
                        }`}
                      >
                        {s.label}
                      </span>
                      {i < 2 && (
                        <div className="mx-3 h-px w-8 bg-muted" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {step === "script" && (
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-muted-foreground">
                      视频主题或文案
                    </label>
                    <textarea
                      placeholder="输入你想要的视频主题或完整文案，例如：介绍人工智能的发展历史..."
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-muted-foreground">
                      场景模板
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {sceneTemplates.map((template) => (
                        <button
                          key={template}
                          onClick={() => setTopic(template)}
                          className="rounded-full bg-secondary px-3 py-1.5 text-sm text-secondary-foreground transition-colors hover:bg-secondary/80"
                        >
                          {template}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={handleGenerateScript}
                    disabled={isGenerating || !topic.trim()}
                    className="w-full"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        生成脚本中...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        AI 生成脚本
                      </>
                    )}
                  </Button>
                </div>
              )}

              {step === "generate" && (
                <div className="space-y-6">
                  {generatedScript && (
                    <div className="rounded-xl bg-muted p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium">生成的脚本</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setStep("script")}
                        >
                          重新生成
                        </Button>
                      </div>
                      <pre className="whitespace-pre-wrap text-sm text-muted-foreground">
                        {generatedScript}
                      </pre>
                    </div>
                  )}

                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <User className="h-4 w-4" />
                      选择数字人形象
                    </label>
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                      {avatarPresets.map((avatar) => (
                        <button
                          key={avatar.id}
                          onClick={() => setSelectedAvatar(avatar.id)}
                          className={`group overflow-hidden rounded-xl border transition-all ${
                            selectedAvatar === avatar.id
                              ? "border-primary ring-2 ring-primary ring-offset-2"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div className="aspect-square overflow-hidden">
                            <img
                              src={avatar.image}
                              alt={avatar.name}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                          <div className="p-2 text-center">
                            <p className="truncate text-xs font-medium">
                              {avatar.name}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Mic className="h-4 w-4" />
                      选择配音音色
                    </label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {voicePresets.map((voice) => (
                        <button
                          key={voice.id}
                          onClick={() => setSelectedVoice(voice.id)}
                          className={`rounded-lg border px-4 py-3 text-sm transition-colors ${
                            selectedVoice === voice.id
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          {voice.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setStep("script")}>
                      上一步
                    </Button>
                    <Button
                      onClick={handleGenerateVideo}
                      disabled={!selectedAvatar || !selectedVoice || isGenerating}
                      className="flex-1"
                      size="lg"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          生成中...
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4" />
                          生成视频
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {step === "result" && (
                <div className="space-y-6">
                  <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
                    {isGenerating ? (
                      <div className="flex h-full flex-col items-center justify-center text-white">
                        <Loader2 className="mb-4 h-12 w-12 animate-spin" />
                        <p className="text-lg font-medium">视频生成中...</p>
                        <p className="mt-2 text-sm text-white/60">
                          预计需要 30-60 秒
                        </p>
                      </div>
                    ) : (
                      <>
                        <img
                          src={
                            avatarPresets.find((a) => a.id === selectedAvatar)
                              ?.image || "https://picsum.photos/seed/video/800/450"
                          }
                          alt="生成的视频"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-primary transition-transform hover:scale-110">
                            <Play className="ml-1 h-8 w-8" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  {!isGenerating && (
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setStep("script")}>
                        重新制作
                      </Button>
                      <Button className="flex-1">
                        <Download className="mr-2 h-4 w-4" />
                        下载视频
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold">使用指南</h2>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="font-medium text-primary">1.</span>
                  <span>输入视频主题或完整文案</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium text-primary">2.</span>
                  <span>选择喜欢的数字人形象</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium text-primary">3.</span>
                  <span>挑选合适的配音音色</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-medium text-primary">4.</span>
                  <span>点击生成，等待视频完成</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="mb-3 text-lg font-semibold">应用场景</h2>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="rounded-lg bg-muted p-3">
                  <p className="font-medium text-foreground">📱 短视频创作</p>
                  <p className="mt-1 text-xs">快速生成抖音、快手等平台的短视频内容</p>
                </div>
                <div className="rounded-lg bg-muted p-3">
                  <p className="font-medium text-foreground">📚 知识科普</p>
                  <p className="mt-1 text-xs">制作专业的知识讲解和科普视频</p>
                </div>
                <div className="rounded-lg bg-muted p-3">
                  <p className="font-medium text-foreground">🏢 企业宣传</p>
                  <p className="mt-1 text-xs">公司介绍、产品宣传、培训视频等</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
