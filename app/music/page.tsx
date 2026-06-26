"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Music, Play, Pause, Download, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { generateMusic } from "@/lib/ai-service";

const musicStyles = [
  { id: "pop", name: "流行", icon: "🎵" },
  { id: "electronic", name: "电子", icon: "🎹" },
  { id: "rock", name: "摇滚", icon: "🎸" },
  { id: "classical", name: "古典", icon: "🎻" },
  { id: "jazz", name: "爵士", icon: "🎷" },
  { id: "hiphop", name: "嘻哈", icon: "🎤" },
  { id: "ambient", name: "氛围", icon: "🌙" },
  { id: "cinematic", name: "电影", icon: "🎬" },
];

const moods = [
  { id: "happy", name: "欢快" },
  { id: "sad", name: "忧伤" },
  { id: "epic", name: "史诗" },
  { id: "calm", name: "平静" },
  { id: "energetic", name: "活力" },
  { id: "mysterious", name: "神秘" },
];

const sampleTracks = [
  {
    id: "1",
    title: "晨曦之光",
    style: "氛围音乐",
    duration: "2:30",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "2",
    title: "都市节拍",
    style: "电子音乐",
    duration: "3:15",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: "3",
    title: "星空漫步",
    style: "环境音乐",
    duration: "4:02",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
];

export default function MusicPage() {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [duration, setDuration] = useState("30");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTrack, setGeneratedTrack] = useState<{
    title: string;
    url: string;
  } | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setGeneratedTrack(null);
    try {
      const result = await generateMusic({
        prompt,
        style: selectedStyle,
        mood: selectedMood,
        duration: parseInt(duration),
      });
      setGeneratedTrack(result);
    } catch (error) {
      console.error("生成音乐失败:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const togglePlay = (id: string, url: string) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 p-6 md:p-8"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
            <Music className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">音乐生成器</h1>
            <p className="mt-2 text-muted-foreground">
              AI 智能作曲，根据你的心情和场景生成专属音乐。支持多种风格和情绪，一键生成专业级音乐作品。
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold">创作描述</h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-muted-foreground">
                    描述你想要的音乐
                  </label>
                  <Input
                    placeholder="例如：一首欢快的夏日流行歌曲，带有吉他和鼓点..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-muted-foreground">
                    音乐风格
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {musicStyles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() =>
                          setSelectedStyle(
                            selectedStyle === style.id ? "" : style.id
                          )
                        }
                        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors ${
                          selectedStyle === style.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        }`}
                      >
                        <span>{style.icon}</span>
                        <span>{style.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-muted-foreground">
                    情绪氛围
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {moods.map((mood) => (
                      <button
                        key={mood.id}
                        onClick={() =>
                          setSelectedMood(
                            selectedMood === mood.id ? "" : mood.id
                          )
                        }
                        className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                          selectedMood === mood.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        }`}
                      >
                        {mood.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-muted-foreground">
                    时长（秒）: {duration}s
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="120"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full accent-primary"
                  />
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      生成中...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      生成音乐
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {generatedTrack && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{generatedTrack.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        AI 生成 · 约 {duration} 秒
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => togglePlay("generated", generatedTrack.url)}
                      >
                        {playingId === "generated" ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {playingId === "generated" && (
                    <audio
                      src={generatedTrack.url}
                      autoPlay
                      onEnded={() => setPlayingId(null)}
                      className="mt-4 w-full"
                      controls
                    />
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold">示例作品</h2>
              <div className="space-y-3">
                {sampleTracks.map((track) => (
                  <div
                    key={track.id}
                    className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-accent/50"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 shrink-0"
                      onClick={() => togglePlay(track.id, track.url)}
                    >
                      {playingId === track.id ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{track.title}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {track.style} · {track.duration}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="mb-3 text-lg font-semibold">使用提示</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  详细的描述能生成更符合预期的音乐
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  尝试组合不同风格和情绪
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  生成的音乐可用于短视频、播客等
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  免费版每日限生成 5 首
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
