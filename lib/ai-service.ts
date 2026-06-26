export interface GenerateImageParams {
  prompt: string;
  style?: string;
  size?: string;
  negativePrompt?: string;
}

export interface GeneratePromptParams {
  topic: string;
  style?: string;
  language?: string;
}

export interface GenerateEmoticonParams {
  text: string;
  style?: string;
  character?: string;
}

export interface GenerateMusicParams {
  prompt: string;
  style?: string;
  mood?: string;
  duration?: number;
}

const HUGGINGFACE_API_KEY = process.env.NEXT_PUBLIC_HF_API_KEY || "";
const HF_API_BASE = "https://api-inference.huggingface.co/models";

const FREE_IMAGE_MODELS = [
  "stabilityai/stable-diffusion-xl-base-1.0",
  "runwayml/stable-diffusion-v1-5",
  "CompVis/stable-diffusion-v1-4",
];

const FREE_TEXT_MODELS = [
  "google/flan-t5-large",
  "mistralai/Mistral-7B-Instruct-v0.2",
  "meta-llama/Llama-2-7b-chat-hf",
];

async function queryHuggingFace(
  model: string,
  data: any,
  isImage = false
): Promise<any> {
  const response = await fetch(`${HF_API_BASE}/${model}`, {
    headers: {
      Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HuggingFace API error: ${response.status}`);
  }

  if (isImage) {
    return response.blob();
  }
  return response.json();
}

export async function generateImage(params: GenerateImageParams): Promise<string> {
  if (!HUGGINGFACE_API_KEY) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const seed = encodeURIComponent(params.prompt.slice(0, 20) + Date.now());
    return `https://picsum.photos/seed/${seed}/512/512`;
  }

  try {
    const prompt = params.style
      ? `${params.prompt}, ${params.style} style`
      : params.prompt;

    const blob = await queryHuggingFace(
      FREE_IMAGE_MODELS[0],
      { inputs: prompt },
      true
    );

    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Image generation failed:", error);
    const seed = encodeURIComponent(params.prompt.slice(0, 20) + Date.now());
    return `https://picsum.photos/seed/${seed}/512/512`;
  }
}

export async function generatePrompt(params: GeneratePromptParams): Promise<string> {
  if (!HUGGINGFACE_API_KEY) {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const templates = [
      `高品质${params.topic}，8K分辨率，专业摄影，电影级灯光，精致的细节，构图精美，艺术风格，超现实，杰作`,
      `${params.topic}，最佳质量，高细节，柔和光线，景深，色彩鲜艳，梦幻氛围，艺术摄影`,
      `杰作，最佳质量，${params.topic}，详细的背景，电影构图，动态角度，史诗感，视觉冲击`,
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  }

  try {
    const result = await queryHuggingFace(FREE_TEXT_MODELS[0], {
      inputs: `Generate a detailed AI art prompt about ${params.topic} in ${params.style || "photorealistic"} style:`,
      parameters: {
        max_new_tokens: 200,
        temperature: 0.7,
      },
    });

    if (result[0]?.generated_text) {
      return result[0].generated_text;
    }
    throw new Error("No generated text");
  } catch (error) {
    console.error("Prompt generation failed:", error);
    return `${params.topic}，高品质，详细，8K分辨率，专业摄影，${params.style || "写实"}风格`;
  }
}

export async function generateEmoticon(params: GenerateEmoticonParams): Promise<string> {
  if (!HUGGINGFACE_API_KEY) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const seed = encodeURIComponent(params.text + params.style + Date.now());
    return `https://picsum.photos/seed/${seed}/256/256`;
  }

  try {
    const prompt = `${params.character || "cute character"} emoji with text "${params.text}", ${params.style || "cartoon"} style, white background, sticker style, high quality`;

    const blob = await queryHuggingFace(
      FREE_IMAGE_MODELS[1],
      { inputs: prompt },
      true
    );

    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Emoticon generation failed:", error);
    const seed = encodeURIComponent(params.text + Date.now());
    return `https://picsum.photos/seed/${seed}/256/256`;
  }
}

export async function generateMusic(params: GenerateMusicParams): Promise<{
  title: string;
  url: string;
}> {
  await new Promise((resolve) => setTimeout(resolve, 2500));

  const sampleTracks = [
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  ];

  const titlePrefix = params.mood ? `${params.mood}的` : "";
  const titles = [
    `${titlePrefix}${params.prompt.slice(0, 10) || "创意"}之音`,
    `${titlePrefix}梦境旋律`,
    `${titlePrefix}星空乐章`,
    `${titlePrefix}心灵回响`,
    `${titlePrefix}时光印记`,
  ];

  return {
    title: titles[Math.floor(Math.random() * titles.length)],
    url: sampleTracks[Math.floor(Math.random() * sampleTracks.length)],
  };
}

export async function generateVideoScript(topic: string): Promise<string> {
  if (!HUGGINGFACE_API_KEY) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return `【场景1】开场\n镜头：全景\n台词：欢迎来到${topic}的世界\n时长：3秒\n\n【场景2】主体展示\n镜头：中景\n台词：今天我们来探索${topic}的魅力\n时长：5秒\n\n【场景3】细节特写\n镜头：特写\n台词：每一个细节都充满惊喜\n时长：4秒\n\n【场景4】结尾\n镜头：全景\n台词：感谢观看，下期再见\n时长：3秒`;
  }

  try {
    const result = await queryHuggingFace(FREE_TEXT_MODELS[0], {
      inputs: `Write a short video script about ${topic} with 4 scenes:`,
      parameters: {
        max_new_tokens: 300,
        temperature: 0.8,
      },
    });

    if (result[0]?.generated_text) {
      return result[0].generated_text;
    }
    throw new Error("No generated text");
  } catch (error) {
    console.error("Video script generation failed:", error);
    return `视频脚本：关于${topic}的精彩内容`;
  }
}
