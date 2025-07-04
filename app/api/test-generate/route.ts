import { NextRequest, NextResponse } from "next/server";
import { LaunchScript, LaunchPlatform } from "@/types/launch";

const OPENROUTER_API_KEY = "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";
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

interface GenerateRequest {
  projectName: string;
  tagline: string;
  features: string;
  targetUsers: string;
  platforms: string[];
  demoLink?: string;
  stylePreference: "professional" | "casual" | "minimal";
}

const SYSTEM_PROMPT = `You are a senior product marketing expert specializing in creating professional launch content for indie hackers and startup founders. 

Your task is to generate high-quality, engaging launch scripts that:
- Are natural, concise, and compelling
- Match overseas developer and startup community language habits
- Focus on value proposition and user benefits
- Include specific actionable content
- Follow platform-specific best practices

Always maintain consistency in tone and messaging across all platforms while adapting to each platform's unique format and audience expectations.`;

const PLATFORM_PROMPTS = {
  "product-hunt": `Generate a complete Product Hunt launch script with the following sections:

🎯 Title (max 60 characters, highlight innovation):
📝 Tagline (one-sentence value proposition):
📖 Description (3-4 paragraphs covering: Why we built it, What it does, Who it's for, What's next):
🎙️ Maker Comment (personal message from founder, 2-3 sentences):
💬 Hunter Pitch (compelling pitch for potential hunters, 2 sentences):

Make it engaging and focus on the problem-solution fit.`,

  "reddit": `Generate Reddit post templates for indie hacker communities:

📌 Recommended Subreddits: r/SideProject, r/IndieHackers, r/Entrepreneur
---
📋 Title Formula: "Just launched [PROJECT] – helps [TARGET_USERS] [KEY_BENEFIT]"
📄 Post Body Template:
- Hook (personal story/problem)
- Solution overview
- Key features (3-4 bullets)
- Demo link and call-to-action
- Community question for engagement

Keep it authentic and community-focused, not salesy.`,

  "twitter": `Generate X/Twitter content pack:

🚀 Launch Thread (5-7 tweets):
Tweet 1: Hook + announcement
Tweet 2-3: Problem/solution
Tweet 4-5: Key features/benefits  
Tweet 6: Demo/CTA
Tweet 7: Community appreciation

⏰ Countdown Content (3 tweets for pre-launch):
- 1 week before
- 24 hours before  
- Launch day morning

🔥 Engagement Tweets (3 variations):
- Question format
- Behind-the-scenes
- User benefit focused

Keep tweets under 280 characters with clear calls-to-action.`,

  "hacker-news": `Generate Hacker News launch strategy:

📊 Title Suggestions (3 options, following HN conventions):
1. Show HN: [Product Name] – [Brief Description]
2. [Product Name]: [Value Proposition] 
3. Ask HN: Feedback on [Product Name] – [What it does]

🎯 Submission Strategy:
- Best posting times
- Content approach
- Key points to emphasize

💭 Comment Interaction Guidelines:
- How to respond to feedback
- Technical details to highlight
- Community engagement tips`,

  "discord": `Generate Discord community scripts:

🎤 Elevator Pitch (30-second version for quick introductions):
💬 Community Introduction (for developer/startup Discord servers):
🤝 Networking Script (for connecting with potential users/collaborators):

Focus on building relationships, not direct selling. Emphasize community value and mutual benefit.`
};

async function generateScriptForPlatform(
  platform: LaunchPlatform,
  projectData: GenerateRequest
): Promise<LaunchScript> {
  const platformPrompt = PLATFORM_PROMPTS[platform];
  
  const userPrompt = `Project Details:
- Name: ${projectData.projectName}
- Tagline: ${projectData.tagline}
- Features: ${projectData.features}
- Target Users: ${projectData.targetUsers}
- Demo Link: ${projectData.demoLink || "Not provided"}
- Style Preference: ${projectData.stylePreference}

${platformPrompt}

Generate professional, engaging content that matches the ${projectData.stylePreference} style preference.`;

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://launchforge.app',
        'X-Title': 'LaunchForge - AI Launch Script Factory',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT,
          },
          {
            role: 'user',
            content: userPrompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '';

    return {
      id: `${platform}-${Date.now()}`,
      platform,
      title: `${projectData.projectName} - ${platform.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Launch Script`,
      content,
      metadata: {
        generatedAt: new Date().toISOString(),
        model: 'gpt-4o',
        stylePreference: projectData.stylePreference,
      },
    };
  } catch (error) {
    console.error(`Error generating script for ${platform}:`, error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json();
    
    // Validate required fields
    if (!body.projectName || !body.tagline || !body.features || !body.targetUsers || !body.platforms?.length) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    console.log("Generating scripts for platforms:", body.platforms);

    // Generate scripts for selected platforms
    const scriptPromises = body.platforms.map(platform => 
      generateScriptForPlatform(platform as LaunchPlatform, body)
    );

    const scripts = await Promise.all(scriptPromises);

    // Create launch package
    const launchPackage = {
      id: `launch-${Date.now()}`,
      projectName: body.projectName,
      tagline: body.tagline,
      scripts,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: "test-user", // For testing without auth
    };

    return NextResponse.json({ success: true, data: launchPackage });

  } catch (error) {
    console.error("Error generating launch scripts:", error);
    return NextResponse.json(
      { 
        error: "Failed to generate launch scripts", 
        details: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    );
  }
}