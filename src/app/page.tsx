import { Hero, UseCases, HowItWorks, FinalCTA, Footer } from "@/components/sections"
import { Header } from "@/components/Header"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <UseCases />
      <HowItWorks />
      <FinalCTA />
      <Footer />
    </main>
  )
}
