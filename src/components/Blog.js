import React from "react";
import SEO from "./SEO";
import { Link } from "react-router-dom";
import "./Blog.css";

const blogPosts = [
  {
    id: 1,
    title: "10 Tips to Create an ATS-Friendly Resume That Gets You Hired",
    excerpt:
      "Learn the essential strategies to optimize your resume for Applicant Tracking Systems and increase your chances of landing interviews.",
    date: "2025-12-20",
    author: "Career Expert Team",
    slug: "ats-friendly-resume-tips",
    keywords: "ATS resume, resume optimization, job application tips",
  },
  {
    id: 2,
    title: "How to Write a Professional Resume Summary That Stands Out",
    excerpt:
      "Discover how to craft a compelling resume summary that captures hiring managers' attention in seconds.",
    date: "2025-12-18",
    author: "Resume Specialist",
    slug: "professional-resume-summary",
    keywords: "resume summary, professional resume, resume writing",
  },
  {
    id: 3,
    title: "Best Resume Templates for 2025: Industry-Specific Designs",
    excerpt:
      "Explore the top resume templates for different industries and learn which design works best for your career field.",
    date: "2025-12-15",
    author: "Design Team",
    slug: "best-resume-templates-2025",
    keywords: "resume templates, professional templates, resume design",
  },
  {
    id: 4,
    title: "Common Resume Mistakes and How to Avoid Them",
    excerpt:
      "Don't let these frequent resume errors cost you your dream job. Learn what to avoid and how to fix common mistakes.",
    date: "2025-12-12",
    author: "HR Consultant",
    slug: "common-resume-mistakes",
    keywords: "resume mistakes, resume tips, job search advice",
  },
  {
    id: 5,
    title: "How AI is Revolutionizing Resume Building in 2025",
    excerpt:
      "Understand how artificial intelligence is transforming the way professionals create resumes and how you can leverage it.",
    date: "2025-12-10",
    author: "Tech Writer",
    slug: "ai-resume-building",
    keywords: "AI resume builder, resume technology, artificial intelligence",
  },
  {
    id: 6,
    title: "Resume Keywords: How to Use Them to Pass ATS Screening",
    excerpt:
      "Master the art of incorporating the right keywords in your resume to ensure it passes automated screening systems.",
    date: "2025-12-08",
    author: "SEO Specialist",
    slug: "resume-keywords-ats",
    keywords: "resume keywords, ATS optimization, job keywords",
  },
];

const Blog = () => {
  return (
    <div className="blog-page">
      <SEO
        title="Resume Writing Tips & Career Advice Blog | Smart AllinoneResume"
        description="Expert advice on resume writing, ATS optimization, career development, and job search strategies. Learn how to create professional resumes that get results."
        keywords="resume tips, career advice, resume writing, ATS optimization, job search tips, professional development, resume blog"
        canonical="https://smartallinoneresume.com/blog"
      />

      <section className="blog-hero">
        <div className="container">
          <h1>Resume Writing Tips & Career Advice</h1>
          <p>
            Expert guidance to help you create professional resumes and advance
            your career
          </p>
        </div>
      </section>

      <section className="blog-posts">
        <div className="container">
          <div className="posts-grid">
            {blogPosts.map((post) => (
              <article key={post.id} className="blog-card">
                <div className="blog-card-content">
                  <time className="blog-date" dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <h2 className="blog-title">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <div className="blog-meta">
                    <span className="blog-author">By {post.author}</span>
                    <Link to={`/blog/${post.slug}`} className="read-more">
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="blog-cta">
        <div className="container">
          <h2>Ready to Create Your Professional Resume?</h2>
          <p>
            Use our free ATS-friendly resume builder and land your dream job
          </p>
          <Link to="/edit-template" className="btn btn-gradient btn-lg">
            Start Building Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Blog;
