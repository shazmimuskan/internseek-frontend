import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import {
  Sparkles,
  FileText,
  Briefcase,
  Send,
  CheckCircle2,
  Loader2,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

import "./Questions.css";

function Questions() {
  const [resumeText, setResumeText] = useState("");

const [savedResume] = useState(
  localStorage.getItem("resumeText") || ""
);

  const [usingSavedResume, setUsingSavedResume] = useState(false);

  const [role, setRole] = useState("Software Developer");

  const [questions, setQuestions] = useState("");

  const [loading, setLoading] = useState(false);

  const useSavedResume = () => {
    setResumeText(savedResume);
    setUsingSavedResume(true);
  };

  const generateQuestions = async () => {
    if (!resumeText || resumeText.trim().length < 30) {
      alert("Please paste your resume before generating questions");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://internseek-backend-84rv.onrender.com/generate-questions",
        {
          resumeText,
          role,
        }
      );

      setQuestions(res.data.questions);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("Something went wrong");
    }
  };

  return (
    <div className="questions-page">

      {/* HEADER */}
      <section className="questions-header">

        <div className="questions-eyebrow">
          <Sparkles size={15} />
          AI INTERVIEW COACH
        </div>

        <h1>
          Prepare smarter.
          <span> Interview better.</span>
        </h1>

        <p>
          Generate personalized interview questions based on your resume
          and the role you're targeting.
        </p>

      </section>


      {/* WORKSPACE */}
      <section className="interview-workspace">

        <div className="workspace-header">

          <div className="workspace-title">

            <div className="workspace-icon">
              <MessageSquare size={21} />
            </div>

            <div>
              <span>INTERVIEW PREPARATION</span>
              <h2>Tell us about yourself</h2>
            </div>

          </div>

          <div className="step-indicator">
            Step 1 of 2
          </div>

        </div>


        {/* SAVED RESUME */}
        {savedResume && !usingSavedResume && (
          <div className="saved-resume">

            <div className="saved-resume-icon">
              <FileText size={18} />
            </div>

            <div className="saved-resume-info">
              <strong>Your resume is ready</strong>
              <span>
                Use the resume you uploaded in Resume Analyzer.
              </span>
            </div>

            <button
              className="use-resume-button"
              onClick={useSavedResume}
            >
              Use Saved Resume
              <ArrowRight size={15} />
            </button>

          </div>
        )}


        {usingSavedResume && (
          <div className="resume-active">

            <CheckCircle2 size={17} />

            <span>Using your saved resume</span>

          </div>
        )}


        {/* RESUME INPUT */}
        <div className="input-group">

          <label>
            <FileText size={16} />
            Your resume
          </label>

          <textarea
            className="resume-textarea"
            placeholder="Paste your resume here..."
            value={resumeText}
            onChange={(e) => {
              setResumeText(e.target.value);
              setUsingSavedResume(false);
            }}
          />

          <div className="character-hint">
            {resumeText.length > 0
              ? `${resumeText.length} characters`
              : "Paste at least 30 characters"}
          </div>

        </div>


        {/* ROLE */}
        <div className="input-group">

          <label>
            <Briefcase size={16} />
            Target role
          </label>

          <select
            className="role-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option>Software Developer</option>
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>Data Analyst</option>
            <option>UI/UX Designer</option>
          </select>

        </div>


        {/* GENERATE */}
        <button
          className="generate-button"
          onClick={generateQuestions}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 size={18} className="spin" />
              Generating questions...
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Generate Interview Questions
              <Send size={16} />
            </>
          )}
        </button>

      </section>


      {/* RESULTS */}
      {questions && (
        <section className="questions-result">

          <div className="result-heading">

            <div className="result-heading-left">

              <div className="result-icon">
                <Sparkles size={20} />
              </div>

              <div>
                <span>AI GENERATED</span>
                <h2>Your interview questions</h2>
              </div>

            </div>

            <div className="role-badge">
              <Briefcase size={14} />
              {role}
            </div>

          </div>


          <div className="questions-output">
            <ReactMarkdown>{questions}</ReactMarkdown>
          </div>

        </section>
      )}

    </div>
  );
}

export default Questions;