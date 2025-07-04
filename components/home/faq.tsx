const faqs = [
  {
    id: 1,
    question: "What platforms does LaunchForge support?",
    answer:
      "LaunchForge generates launch scripts for Product Hunt, Reddit (r/SideProject, r/IndieHackers), Hacker News, X (Twitter), and Discord. Each script is tailored to the platform's specific audience and best practices.",
  },
  {
    id: 2,
    question: "How does the AI generate launch scripts?",
    answer:
      "Our AI analyzes your project details and uses proven launch templates to create professional scripts. It considers your target audience, product features, and preferred writing style to generate content that resonates with each platform's community.",
  },
  {
    id: 3,
    question: "Can I customize the generated scripts?",
    answer:
      "Absolutely! The generated scripts are fully editable templates designed to give you a professional starting point. You can modify them to match your brand voice or add specific details before launching.",
  },
  {
    id: 4,
    question: "What export formats are available?",
    answer:
      "You can export your launch scripts in multiple formats: Markdown files for easy editing, PDF for sharing with team members, or directly to Notion for project management. All exports are copy-paste ready.",
  },
  {
    id: 5,
    question: "Do you offer refunds?",
    answer:
      "Yes, we offer a 7-day money-back guarantee. If you're not satisfied with the quality of your generated launch scripts, contact us for a full refund within 7 days of purchase.",
  },
  {
    id: 6,
    question: "How quickly are scripts generated?",
    answer:
      "Launch scripts are typically generated within 30-60 seconds. The AI processes your project information and creates tailored content for all selected platforms simultaneously.",
  },
]

export default function FAQ() {
  return (
    <div id="faq" className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Frequently asked questions</h2>
        <dl className="mt-20 divide-y divide-foreground/10">
          {faqs.map((faq) => (
            <div key={faq.id} className="py-8 first:pt-0 last:pb-0 lg:grid lg:grid-cols-12 lg:gap-8">
              <dt className="text-base/7 font-semibold text-foreground lg:col-span-5">{faq.question}</dt>
              <dd className="mt-4 lg:col-span-7 lg:mt-0">
                <p className="text-base/7 text-muted-foreground">{faq.answer}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
} 