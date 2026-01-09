import { Hero, UseCases, HowItWorks, FinalCTA, Footer } from "@/components/sections"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <UseCases />
      <HowItWorks />
      <FinalCTA />
      <Footer />
    </main>
  )
}
