import { client } from '@/lib/sanity'
import { projectsQuery, experienceQuery, stripsQuery } from '@/lib/queries'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Building from '@/components/Building'
import Experience from '@/components/Experience'
import MusicSection from '@/components/MusicSection'
import KnowMe from '@/components/KnowMe'
import Footer from '@/components/Footer'
import StatusBar from '@/components/StatusBar'
import PixelMascot from '@/components/PixelMascot'
import CrosshairCursor from '@/components/CrosshairCursor'

export const revalidate = 60

export default async function Home() {
  const [projects, experience, strips] = await Promise.all([
    client.fetch(projectsQuery).catch(() => []),
    client.fetch(experienceQuery).catch(() => []),
    client.fetch(stripsQuery).catch(() => []),
  ])

  return (
    <>
      <CrosshairCursor />
      <StatusBar />
      <PixelMascot />
      <main>
        <Nav />
        <Hero />
        <Building projects={projects} />
        <Experience items={experience} />
        <MusicSection />
        <KnowMe strips={strips} />
        <Footer />
      </main>
    </>
  )
}
