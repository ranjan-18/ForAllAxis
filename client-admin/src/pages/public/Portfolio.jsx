import React from 'react';
import { Helmet } from 'react-helmet-async';
import PortfolioSection from '../../components/sections/Portfolio';

export default function Portfolio() {
  return (
    <>
      <Helmet>
        <title>Portfolio | ForallAxis Featured Projects</title>
        <meta name="description" content="Browse our featured projects. See how we transform complex challenges into robust digital applications, custom software, and intuitive user experiences." />
        <meta property="og:title" content="Portfolio | ForallAxis Featured Projects" />
        <meta property="og:description" content="Browse our featured projects. See how we transform complex challenges into robust digital applications, custom software, and intuitive user experiences." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div style={{ paddingTop: '8rem' }}>
        <PortfolioSection />
      </div>
    </>
  );
}
