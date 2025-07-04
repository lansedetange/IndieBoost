'use client'

import { RocketLaunchIcon, DocumentTextIcon, CpuChipIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'AI-Powered Generation',
    description:
      'Advanced AI creates professional launch scripts tailored to your product. Get platform-specific content that follows best practices and community guidelines.',
    icon: CpuChipIcon,
  },
  {
    name: 'Multi-Platform Scripts',
    description:
      'Generate launch content for Product Hunt, Reddit, Hacker News, X (Twitter), and Discord. Each script is optimized for the platform\'s unique audience and format.',
    icon: RocketLaunchIcon,
  },
  {
    name: 'Professional Templates',
    description:
      'Battle-tested templates based on successful launches. Includes everything from Product Hunt descriptions to social media threads and community posts.',
    icon: DocumentTextIcon,
  },
  {
    name: 'Easy Export',
    description:
      'Download your launch scripts in multiple formats: Markdown, PDF, or export directly to Notion. Copy-paste ready content for immediate use.',
    icon: ArrowDownTrayIcon,
  },
]

export default function Features() {
  return (
    <div id="features" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-primary">Launch Script Factory</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-foreground sm:text-5xl lg:text-balance">
            Everything you need for successful launches
          </p>
          <p className="mt-6 text-lg/8 text-muted-foreground">
            LaunchForge generates professional launch scripts that help indie hackers and creators 
            nail their product debuts. From Product Hunt to social media, we've got every platform covered.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-foreground">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-primary">
                    <feature.icon aria-hidden="true" className="size-6 text-primary-foreground" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-muted-foreground">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
