export interface LaunchScript {
  id: string;
  platform: LaunchPlatform;
  title: string;
  content: string;
  additionalNotes?: string;
  metadata?: Record<string, any>;
}

export interface LaunchPackage {
  id: string;
  projectName: string;
  tagline: string;
  scripts: LaunchScript[];
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export type LaunchPlatform = 
  | "product-hunt"
  | "reddit" 
  | "hacker-news"
  | "twitter"
  | "discord";

export interface ProductHuntScript {
  title: string;
  tagline: string;
  description: string;
  makerComment: string;
  hunterPitch: string;
}

export interface RedditScript {
  subreddit: string;
  title: string;
  body: string;
  commentStrategy: string;
}

export interface HackerNewsScript {
  titleSuggestions: string[];
  submissionStrategy: string;
  commentGuidelines: string;
}

export interface TwitterScript {
  launchThread: string[];
  countdownTweets: string[];
  engagementTweets: string[];
}

export interface DiscordScript {
  elevatorPitch: string;
  communityMessage: string;
  networkingScript: string;
}