import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function PortfolioDetail() {
  const { slug } = useParams();
  
  const displayTitle = slug
    ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : '';

  return (
    <>
      <Helmet>
        <title>{`Project: ${displayTitle} | ForallAxis Portfolio`}</title>
        <meta name="description" content={`Learn details about our project: ${displayTitle}. High-performance software engineering and digital design by ForallAxis.`} />
        <meta property="og:title" content={`Project: ${displayTitle} | ForallAxis Portfolio`} />
        <meta property="og:description" content={`Learn details about our project: ${displayTitle}. High-performance software engineering and digital design by ForallAxis.`} />
        <meta property="og:type" content="article" />
      </Helmet>
      <div className="section-pad container" style={{ paddingTop: '8rem' }}>
        <h1>Project: {displayTitle}</h1>
      </div>
    </>
  );
}
