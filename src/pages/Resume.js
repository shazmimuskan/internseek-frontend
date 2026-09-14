import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import {
  Upload,
  FileText,
  Sparkles,
  Target,
  CheckCircle2,
  AlertTriangle,
  KeyRound,
  Lightbulb,
  ArrowRight,
  Loader2,
} from "lucide-react";

import "./Resume.css";

function Resume() {
  const [fileName, setFileName] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [score, setScore] = useState(null);
  const [atsAnalysis, setAtsAnalysis] = useState(null);
  const [newScore, setNewScore] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFileName(file.name);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "https://internseek-backend-84rv.onrender.com/upload-resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const extractedText = res.data.text;
      const cleanedText = extractedText.trim();

      if (!cleanedText || cleanedText.length < 30) {
        alert("Invalid resume or unreadable content");

        setResumeText("");
        setScore(null);
        setAtsAnalysis(null);
        setNewScore(null);
        setResult("");

        return;
      }

      setResumeText(extractedText);
      localStorage.setItem("resumeText", extractedText);

      setScore(null);
      setAtsAnalysis(null);
      setNewScore(null);
      setResult("");
    } catch (error) {
      console.log(error);
      alert("Error uploading PDF");
    }
  };

  const analyzeATS = async () => {
    if (!resumeText || resumeText.length < 30) {
      alert("Please upload a valid resume first");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://internseek-backend-84rv.onrender.com/analyze-resume",
        { resumeText }
      );

      setScore(res.data.score);
      setAtsAnalysis(res.data);
    } catch (error) {
      console.log("ATS ERROR:", error);
      alert("Could not analyze resume");
    } finally {
      setLoading(false);
    }
  };

  const improveResume = async () => {
    if (!resumeText || resumeText.length < 30) {
      alert("Upload a valid resume first");
      return;
    }

    try {
      setLoading(true);

      const improveRes = await axios.post(
        "https://internseek-backend-84rv.onrender.com/improve-resume",
        {
          resumeText,
          atsAnalysis,
        }
      );

      const improvedText = improveRes.data.improvedResume;

      setResult(improvedText);

      const analysisRes = await axios.post(
        "https://internseek-backend-84rv.onrender.com/analyze-resume",
        { resumeText: improvedText }
      );

      setNewScore(analysisRes.data.score);
    } catch (error) {
      console.log("IMPROVE RESUME ERROR:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getScoreLabel = (value) => {
    if (value >= 80) return "Excellent";
    if (value >= 60) return "Good";
    if (value >= 40) return "Needs work";
    return "Needs improvement";
  };

  return (
    <div className="resume-page">

      {/* HEADER */}
      <section className="resume-header">
        <div className="resume-eyebrow">
          <Sparkles size={15} />
          AI RESUME OPTIMIZER
        </div>

        <h1>
          Make your resume
          <span> stand out.</span>
        </h1>

        <p>
          Upload your resume and let AI analyze its ATS compatibility,
          identify weaknesses, and suggest improvements.
        </p>
      </section>

      {/* UPLOAD */}
      <section className="resume-workspace">

        <div className="upload-card">

          <div className="upload-icon">
            <Upload size={25} />
          </div>

          <h2>Upload your resume</h2>

          <p>
            Upload a PDF resume to start your AI-powered analysis.
          </p>

          <label className="upload-button">
            <Upload size={17} />
            Choose PDF
            <input
              type="file"
              accept=".pdf"
              onChange={handleFile}
            />
          </label>

          {fileName && (
            <div className="uploaded-file">
              <FileText size={18} />

              <div>
                <strong>{fileName}</strong>
                <span>Resume uploaded successfully</span>
              </div>

              <CheckCircle2 size={18} />
            </div>
          )}

          {!fileName && (
            <span className="upload-hint">
              PDF files only
            </span>
          )}

        </div>

        {/* ACTIONS */}
        <div className="resume-actions">

          <button
            className="analyze-button"
            onClick={analyzeATS}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 size={17} className="spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Target size={17} />
                Analyze ATS Score
              </>
            )}
          </button>

          <button
            className="improve-button"
            onClick={improveResume}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 size={17} className="spin" />
                Improving...
              </>
            ) : (
              <>
                <Sparkles size={17} />
                Improve with AI
              </>
            )}
          </button>

        </div>

      </section>

      {/* SCORES */}
      {(score !== null || newScore !== null) && (
        <section className="score-section">

          <div className="score-section-heading">
            <div>
              <span>RESUME PERFORMANCE</span>
              <h2>Your ATS score</h2>
            </div>
          </div>

          <div className="score-grid">

            {score !== null && (
              <div className="score-card">

                <div className="score-card-top">
                  <div>
                    <span>Current resume</span>
                    <h3>ATS Score</h3>
                  </div>

                  <Target size={20} />
                </div>

                <div className="score-display">
                  <div
                    className="score-ring"
                    style={{
                      "--score": `${score * 3.6}deg`,
                    }}
                  >
                    <div className="score-inner">
                      <strong>{score}</strong>
                      <span>/100</span>
                    </div>
                  </div>

                  <div className="score-info">
                    <strong>{getScoreLabel(score)}</strong>
                    <span>Current ATS compatibility</span>
                  </div>
                </div>

                <div className="score-bar">
                  <div
                    style={{ width: `${score}%` }}
                  />
                </div>

              </div>
            )}

            {newScore !== null && (
              <div className="score-card improved-score">

                <div className="score-card-top">
                  <div>
                    <span>After AI optimization</span>
                    <h3>Improved Score</h3>
                  </div>

                  <Sparkles size={20} />
                </div>

                <div className="score-display">
                  <div
                    className="score-ring improved-ring"
                    style={{
                      "--score": `${newScore * 3.6}deg`,
                    }}
                  >
                    <div className="score-inner">
                      <strong>{newScore}</strong>
                      <span>/100</span>
                    </div>
                  </div>

                  <div className="score-info">
                    <strong>{getScoreLabel(newScore)}</strong>
                    <span>AI-optimized ATS compatibility</span>
                  </div>
                </div>

                <div className="score-bar improved-bar">
                  <div
                    style={{ width: `${newScore}%` }}
                  />
                </div>

              </div>
            )}

          </div>
        </section>
      )}

      {/* ATS ANALYSIS */}
      {atsAnalysis && (
        <section className="analysis-section">

          <div className="analysis-heading">
            <div className="analysis-heading-icon">
              <Sparkles size={20} />
            </div>

            <div>
              <span>AI INSIGHTS</span>
              <h2>Resume analysis</h2>
            </div>
          </div>

          <div className="analysis-grid">

            <div className="analysis-card">
              <div className="analysis-card-title success">
                <CheckCircle2 size={19} />
                <h3>Strengths</h3>
              </div>

              <ul>
                {atsAnalysis.strengths?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="analysis-card">
              <div className="analysis-card-title warning">
                <AlertTriangle size={19} />
                <h3>Weaknesses</h3>
              </div>

              <ul>
                {atsAnalysis.weaknesses?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="analysis-card">
              <div className="analysis-card-title keyword">
                <KeyRound size={19} />
                <h3>Missing Keywords</h3>
              </div>

              <ul>
                {atsAnalysis.missingKeywords?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="analysis-card">
              <div className="analysis-card-title suggestion">
                <Lightbulb size={19} />
                <h3>Suggestions</h3>
              </div>

              <ul>
                {atsAnalysis.suggestions?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

          </div>
        </section>
      )}

      {/* IMPROVED RESUME */}
      {result && (
        <section className="result-section">

          <div className="result-header">
            <div className="result-title">
              <div className="result-icon">
                <Sparkles size={20} />
              </div>

              <div>
                <span>AI GENERATED</span>
                <h2>Improved Resume</h2>
              </div>
            </div>

            {newScore !== null && (
              <div className="improvement-badge">
                <ArrowRight size={15} />
                Optimized
              </div>
            )}
          </div>

          <div className="output-box">
            <ReactMarkdown>{result}</ReactMarkdown>
          </div>

        </section>
      )}

    </div>
  );
}

export default Resume;