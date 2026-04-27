import { client } from '@/lib/sanity'
import { projectsQuery, experienceQuery, stripsQuery } from '@/lib/queries'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Building from '@/components/Building'
import Experience from '@/components/Experience'
import KnowMe from '@/components/KnowMe'
import Footer from '@/components/Footer'
import StarField from '@/components/StarField'
import StatusBar from '@/components/StatusBar'
import Astronaut from '@/components/Astronaut'

export const revalidate = 60

export default async function Home() {
  const [projects, experience, strips] = await Promise.all([
    client.fetch(projectsQuery).catch(() => []),
    client.fetch(experienceQuery).catch(() => []),
    client.fetch(stripsQuery).catch(() => []),
  ])

  return (
    <>
      <StarField />
      <StatusBar />
      <Astronaut />
      <main className="relative">
        <Nav />
        <Hero />
        <Building projects={projects} />
        <Experience items={experience} />
        <KnowMe strips={strips} />
        <Footer />
      </main>
    </>
  )
}
