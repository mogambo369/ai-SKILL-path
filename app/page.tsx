import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Star, Github, Linkedin, Twitter } from "lucide-react"
import { FAQChatbot } from "@/components/faq-chatbot"
import Galaxy from "@/components/visuals/Galaxy"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-ethereal">
      {/* Header */}
      <header className="sticky top-0 z-30">
        <div className="glass border-b border-border/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-foreground/90 flex items-center justify-center">
                <Star className="w-4 h-4 text-background" />
              </div>
              <span className="font-heading text-xl tracking-wide">Learning</span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/dashboard" className="text-foreground/70 hover:text-foreground">My Path</Link>
              <Link href="/courses" className="text-foreground/70 hover:text-foreground">Courses</Link>
              <Link href="/certificates" className="text-foreground/70 hover:text-foreground">Verify</Link>
              <div className="ml-4 h-4 w-px bg-foreground/20" />
              <div className="flex items-center gap-3 text-foreground/70">
                <a href="#" aria-label="GitHub" className="hover:text-foreground"><Github className="w-4 h-4" /></a>
                <a href="#" aria-label="LinkedIn" className="hover:text-foreground"><Linkedin className="w-4 h-4" /></a>
                <a href="#" aria-label="Twitter" className="hover:text-foreground"><Twitter className="w-4 h-4" /></a>
                <span className="text-xs ml-2">Contact: +1 555 0199</span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        {/* Pink galaxy background across the hero */}
        <div className="absolute inset-0 -z-10">
          <Galaxy mouseRepulsion={true} mouseInteraction={true} density={1.5} glowIntensity={0.5} saturation={0.8} hueShift={330} />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/20 text-foreground/80 text-xs mb-6">
              Bright, magical, sophisticated
            </div>
            <h1 className="font-heading text-5xl sm:text-6xl leading-tight text-foreground mb-6">
              Learn with a spark of wonder
            </h1>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto mb-8">
              A minimalist, luminous learning home. Curated paths, elegant design, and a friendly guide to help you find the perfect course.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/onboarding">
                <Button size="lg" className="px-8">Start your path</Button>
              </Link>
              <Link href="/courses">
                <Button size="lg" variant="outline" className="px-8 bg-transparent">Browse courses</Button>
              </Link>
            </div>
            <p className="text-xs text-foreground/60 mt-6">Playfair Display for a timeless, feminine touch</p>
          </div>
        </div>

        {/* Removed centered guide box */}
      </section>

      {/* Footer with social + FAQ */}
      <footer className="mt-24">
        <div className="border-t border-border/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 text-sm">
            <div className="grid lg:grid-cols-3 gap-10">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-foreground/90 flex items-center justify-center">
                    <Star className="w-4 h-4 text-background" />
                  </div>
                  <span className="font-heading text-lg">Learning</span>
                </div>
                <p className="text-foreground/70">Bright, magical, sophisticated learning.</p>
                <div className="flex items-center gap-3 text-foreground/70">
                  <a href="#" aria-label="GitHub" className="hover:text-foreground"><Github className="w-4 h-4" /></a>
                  <a href="#" aria-label="LinkedIn" className="hover:text-foreground"><Linkedin className="w-4 h-4" /></a>
                  <a href="#" aria-label="Twitter" className="hover:text-foreground"><Twitter className="w-4 h-4" /></a>
                  <span className="ml-2">Contact: +1 555 0199</span>
                </div>
              </div>

              <div className="lg:col-span-2">
                <h3 className="font-heading text-base mb-4">FAQ</h3>
                <div className="grid md:grid-cols-2 gap-6 text-foreground/80">
                  <div>
                    <p className="font-semibold mb-1">What exactly is SkillSparkle?</p>
                    <p className="text-sm">SkillSparkle is your personal career navigator! 🚀 Think of it as a magical map for your professional journey. We use smart AI to create a unique, step-by-step learning path just for you, connecting you with the best courses and skills needed to land your dream job.</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">How does the AI create my personalized learning path?</p>
                    <p className="text-sm">It's a little bit of magic and a lot of smart tech! 🤖 Tell us your skills, background, and goals. Our AI compares them with real-time market demand and designs the most efficient pathway of courses and credentials. Your path adapts as you progress.</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">What are Verifiable Credentials and why blockchain?</p>
                    <p className="text-sm">They’re secure, digital trophies you truly own. 🔗 We record them on blockchain so they're authentic and instantly shareable with employers—no paper or long verification calls.</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Do I need to understand AI or blockchain?</p>
                    <p className="text-sm">Absolutely not! We keep the tech invisible so you can focus on your goals. If you can use a social app, you can use SkillSparkle.</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Who is this platform for?</p>
                    <p className="text-sm">Students exploring paths, professionals upskilling, and career-changers pivoting into new industries.</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">How do I get started?</p>
                    <p className="text-sm">It's super easy! Sign up free, personalize with quick questions, and explore your first tailored learning path.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 flex items-center justify-between text-foreground/60">
              <span>© 2024 YourPlatformName</span>
              <div className="flex items-center gap-3">
                <a href="#" aria-label="GitHub" className="hover:text-foreground"><Github className="w-4 h-4" /></a>
                <a href="#" aria-label="LinkedIn" className="hover:text-foreground"><Linkedin className="w-4 h-4" /></a>
                <a href="#" aria-label="Twitter" className="hover:text-foreground"><Twitter className="w-4 h-4" /></a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* FAQ Chatbot */}
      <FAQChatbot />
    </div>
  )
}
