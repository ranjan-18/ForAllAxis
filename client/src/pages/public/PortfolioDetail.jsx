import React from 'react';
import { useParams } from 'react-router-dom';

export default function PortfolioDetail() {
  const { slug } = useParams();
  return <div className="section-pad container"><h1>Project: {slug}</h1></div>;
}
