import { ProductTier } from "@/types/subscriptions";

export const LAUNCH_PACKAGES: ProductTier[] = [
  {
    name: "Basic Launch Kit",
    id: "basic-launch-kit",
    productId: "prod_basic_launch", // $19 one-time purchase
    priceMonthly: "$19",
    description: "Essential launch scripts for 3 platforms.",
    features: [
      "Product Hunt launch script",
      "Reddit post templates",
      "X/Twitter content pack",
      "Markdown export",
      "Basic customization"
    ],
    featured: false,
    discountCode: "",
  },
  {
    name: "Pro Launch Kit",
    id: "pro-launch-kit",
    productId: "prod_pro_launch", // $49 one-time purchase
    priceMonthly: "$49",
    description: "Complete launch package for all platforms.",
    features: [
      "Everything in Basic Kit",
      "Hacker News strategy guide",
      "Discord community scripts",
      "Launch timeline planner",
      "Notion template export",
      "PDF professional report",
      "Advanced customization"
    ],
    featured: true,
    discountCode: "LAUNCH50",
  }
];

// For backward compatibility - export as SUBSCRIPTION_TIERS
export const SUBSCRIPTION_TIERS = LAUNCH_PACKAGES;

// Keep credits for future use or remove if not needed
export const CREDITS_TIERS: ProductTier[] = [
  {
    name: "Launch Credits",
    id: "launch-credits",
    productId: "prod_launch_credits", // $19 one-time purchase
    priceMonthly: "$19",
    description: "5 AI-generated launch scripts for your projects.",
    creditAmount: 5,
    features: [
      "5 launch script generations",
      "All platform templates",
      "Export in multiple formats",
      "No expiration date"
    ],
    featured: false,
    discountCode: "",
  }
];
