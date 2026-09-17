import { useEffect, Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Lenis from "lenis";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Manifesto from "@/components/Manifesto";
import Services from "@/components/Services";
import WorkoutStyles from "@/components/WorkoutStyles";
import Trainers from "@/components/Trainers";
import Pricing from "@/components/Pricing";
import SocialProof from "@/components/SocialProof";
import LocationContact from "@/components/LocationContact";
import Footer from "@/components/Footer";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { err: null };
  }
  static getDerivedStateFromError(err) {
    return { err };
  }
  render() {
    if (this.state.err) {
      return (
        <div className="min-h-screen bg-ink text-white flex flex-col items-center justify-center gap-4 p-8 text-center">
          <p className="font-display text-3xl font-extrabold uppercase">
            Something broke mid-workout
          </p>
          <p className="text-slate-400">
            Please refresh the page to get back on the floor.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  useEffect(() => {
    const reduceMotionQuery = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    );
    const prefersReducedMotion = reduceMotionQuery
      ? reduceMotionQuery.matches
      : false;

    if (prefersReducedMotion) {
      return undefined;
    }

    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.1,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.1,
      wheelMultiplier: 0.9,
    });

    window.__lenis = lenis;
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="relative bg-ink text-slate-50 font-body overflow-x-clip">
          <div className="noise-overlay" aria-hidden="true" />
          <Navbar />
          <main>
            <Hero />
            <Marquee />
            <Manifesto />
            <Services />
            <WorkoutStyles />
            <Trainers />
            <Pricing />
            <SocialProof />
            <LocationContact />
          </main>
          <Footer />
          <Toaster theme="dark" position="bottom-right" richColors />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
