import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({
  title = "Smart AllinoneResume - Create Professional Resumes Online Free | ATS-Friendly Resume Builder",
  description = "Build professional, ATS-friendly resumes in minutes with Smart AllinoneResume. Choose from modern templates, customize easily, and download your resume for free.",
  keywords = "resume builder, free resume, ATS resume, professional resume, CV maker, online resume builder",
  canonical = "https://smartallinoneresume.com",
  ogImage = "https://smartallinoneresume.com/og-image.jpg",
  type = "website",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default SEO;
