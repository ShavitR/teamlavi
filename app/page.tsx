import ScrollSequence from '@/components/ScrollSequence';
import Overlay from '@/components/Overlay';
import AmbientBackground from '@/components/AmbientBackground';
import Pillars from '@/components/Pillars';
import Stats from '@/components/Stats';
import HomeCTA from '@/components/HomeCTA';
import ContentBackground from '@/components/ContentBackground';
import ScrollSpine from '@/components/ScrollSpine';
import SnapScroll from '@/components/SnapScroll';

export default function Home() {
  return (
    <main className="relative bg-[#050505] min-h-screen">
      <SnapScroll />
      <AmbientBackground />

      {/* Hero Scrollytelling Section */}
      <section className="relative w-full mb-24">
        <ScrollSequence />
        <Overlay />
      </section>

      {/* NEW Exclusive Animated Content Sections */}
      <div className="relative z-20 bg-[#050505] space-y-20 pb-40 overflow-hidden">
        <ContentBackground />
        <Pillars />
        <Stats />
        <HomeCTA />
      </div>

      {/* Scroll indicator for initial state */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce pointer-events-none z-30 font-light tracking-widest text-sm">
        SCROLL TO EXPLORE
      </div>
    </main>
  );
}
