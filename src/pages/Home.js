import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  FileText,
  Mic2,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

import "./Home.css";

function Home() {
  const features = [
    {
      icon: <BarChart3 size={22} />,
      title: "Application Tracker",
      text: "Track your internship applications, deadlines, and application status in one place.",
      path: "/dashboard",
    },
    {
      icon: <FileText size={22} />,
      title: "Resume AI",
      text: "Analyze and improve your resume with AI-powered suggestions designed for better ATS compatibility.",
      path: "/resume",
    },
    {
      icon: <Mic2 size={22} />,
      title: "Interview Prep",
      text: "Generate personalized interview questions based on your resume and target role.",
      path: "/questions",
    },
  ];

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">

        <div className="hero-badge">
          <Sparkles size={15} />
          AI-powered career companion for students
        </div>

        <h1>
          Launch Your Career
          <span> Smarter with AI.</span>
        </h1>

        <p className="hero-description">
          Track internships, improve your resume, and prepare for interviews
          with one intelligent platform built for students.
        </p>

        <div className="hero-buttons">
          <Link to="/dashboard" className="primary-btn">
            Get Started
            <ArrowRight size={17} />
          </Link>

          <a href="#features" className="secondary-btn">
            Explore Features
          </a>
        </div>

        {/* HERO MINI FEATURES */}
        <div className="hero-highlights">
          <div>
            <Zap size={17} />
            <span>AI-powered tools</span>
          </div>

          <div>
            <Target size={17} />
            <span>Built for students</span>
          </div>

          <div>
            <Sparkles size={17} />
            <span>One career workspace</span>
          </div>
        </div>

      </section>

      {/* FEATURES */}
      <section className="features-section" id="features">

        <div className="section-heading">
          <span>EVERYTHING YOU NEED</span>
          <h2>One platform for your internship journey.</h2>
          <p>
            From finding opportunities to preparing for interviews,
            InternSeek keeps your career preparation organized.
          </p>
        </div>

        <div className="features">
          {features.map((feature) => (
            <Link
              to={feature.path}
              className="feature-card"
              key={feature.title}
            >
              <div className="feature-icon">
                {feature.icon}
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.text}</p>

              <div className="feature-link">
                Explore
                <ArrowRight size={15} />
              </div>
            </Link>
          ))}
        </div>

      </section>

      {/* CTA */}
      <section className="cta">

        <div className="cta-glow"></div>

        <div className="cta-content">
          <div className="cta-icon">
            <Sparkles size={21} />
          </div>

          <h2>Ready to take your career seriously?</h2>

          <p>
            Organize your applications, sharpen your resume,
            and walk into interviews prepared.
          </p>

          <Link to="/dashboard" className="primary-btn">
            Start with InternSeek
            <ArrowRight size={17} />
          </Link>
        </div>

      </section>

    </div>
  );
}

export default Home;