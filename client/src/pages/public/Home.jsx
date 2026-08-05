import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import SplashScreen from '../../components/common/SplashScreen';
import Hero from '../../components/sections/Hero';
import WelcomeSection from '../../components/sections/WelcomeSection';
import AboutPreview from '../../components/sections/AboutPreview';
import Services from '../../components/sections/Services';
import Stats from '../../components/sections/Stats';
import Portfolio from '../../components/sections/Portfolio';
import Testimonials from '../../components/sections/Testimonials';
import BlogPreview from '../../components/sections/BlogPreview';
import CTA from '../../components/sections/CTA';

const Home = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      <Helmet>
        <title>ForAllAxis | Premium Digital Lab</title>
        <meta name="description" content="We specialize in crafting stunning digital experiences, automating your business with AI, and delivering creative solutions that drive real results." />
        <meta property="og:title" content="ForAllAxis | Premium Digital Lab" />
        <meta property="og:description" content="The Best Digital Agency In India. Web Development, AI Automation, Graphic Design, Video Editing, Logo Design, App Development." />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Splash screen overlays everything with fixed positioning */}
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      {/* Main content is always rendered underneath */}
      <Hero />
      <WelcomeSection />
      <AboutPreview />
      <Services />
      <Stats />
      <Portfolio />
      <Testimonials />
      <BlogPreview />
      <CTA />
    </>
  );
};

export default Home;
