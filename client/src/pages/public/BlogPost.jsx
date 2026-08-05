import React from 'react';
import { useParams } from 'react-router-dom';

export default function BlogPost() {
  const { slug } = useParams();
  return <div className="section-pad container"><h1>Blog Post: {slug}</h1></div>;
}
