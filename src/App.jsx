
import React, { useState } from "react";
import "./App.css";

const demos = [
  {
    name: "Flash Sale",
    type: "Shopping",
    icon: "🛍️",
    color: "orange",
  },
  {
    name: "Travel Booking",
    type: "Travel",
    icon: "✈️",
    color: "cyan",
  },
  {
    name: "Subscription",
    type: "Streaming",
    icon: "🎬",
    color: "pink",
  },
  {
    name: "Concert Tickets",
    type: "Events",
    icon: "🎟️",
    color: "green",
  },
];

const formatType = (type) => {
  if (!type) return "Pattern detected";

  return type
    .split("_")
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
};

function App() {
  const [selected, setSelected] = useState(demos[0]);

  const [scanning, setScanning] = useState(false);

  const [showResults, setShowResults] = useState(false);

  const [activeFinding, setActiveFinding] = useState(0);

  const [uploadedImage, setUploadedImage] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const [findings, setFindings] = useState([]);

  const [error, setError] = useState("");

  const handleUpload = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setUploadedImage(imageUrl);
    setSelectedFile(file);

    setShowResults(false);
    setFindings([]);
    setError("");
  };

  const runScan = async () => {
    if (!selectedFile) {
      setError("Please upload a screenshot first.");
      return;
    }

    setScanning(true);
    setShowResults(false);
    setFindings([]);
    setError("");

    try {
      const formData = new FormData();

      formData.append("file", selectedFile);

      const response = await fetch(
        "http://127.0.0.1:8000/analyze",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Backend analysis failed.");
      }

      const result = await response.json();

      console.log("AI RESULT:", result);

      const detectedFindings = result.findings || [];

      setFindings(detectedFindings);

      setActiveFinding(0);

      setShowResults(true);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to analyze the screenshot. Make sure the backend is running."
      );
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="app">

      {/* Background graphics */}
      <div className="blob blob-one"></div>
      <div className="blob blob-two"></div>
      <div className="blob blob-three"></div>

      {/* HEADER */}
      <header className="header">

        <div className="brand">

          <div className="brand-mark">
            🎯
          </div>

          <div>
            <div className="brand-name">
              PRESSURE POINT
            </div>

            <div className="brand-mini">
              AI INTERFACE ANALYZER
            </div>
          </div>

        </div>

        <div className="header-pill">

          <span className="live-dot"></span>

          AI SCANNER ONLINE

        </div>

      </header>

      <main className="main">

        {/* HERO */}
        <section className="hero">

          <div className="eyebrow">
            ✦ SEE WHAT THE INTERFACE IS DOING
          </div>

          <h1>
            Detect the hidden
            <span> pressure </span>
            behind digital design.
          </h1>

          <p>
            Upload an interface screenshot and let AI identify
            visual patterns that may influence users into making
            quick decisions.
          </p>

        </section>

        {/* UPLOAD SECTION */}
        <section className="upload-section">

          <div className="upload-icon">
            📸
          </div>

          <div className="upload-content">

            <h2>
              Upload a Screenshot
            </h2>

            <p>
              Upload a website, shopping page, booking page,
              advertisement or any digital interface.
            </p>

            <label
              htmlFor="screenshot-upload"
              className="upload-button"
            >
              📸 Choose Screenshot
            </label>

            <input
              id="screenshot-upload"
              type="file"
              accept="image/*"
              onChange={handleUpload}
            />

          </div>

        </section>

        {/* UPLOADED IMAGE */}
        {uploadedImage && (

          <section className="uploaded-section">

            <div className="uploaded-header">

              <div>

                <span className="small-label">
                  UPLOADED SCREENSHOT
                </span>

                <h2>
                  Your Interface
                </h2>

              </div>

              <span className="image-ready">
                ✓ IMAGE READY
              </span>

            </div>

            <div className="uploaded-image-wrapper">

              <img
                src={uploadedImage}
                alt="Uploaded interface screenshot"
                className="uploaded-image"
              />

              {scanning && (

                <div className="upload-scan-line">

                  <span>
                    AI SCANNING...
                  </span>

                </div>

              )}

            </div>

          </section>

        )}

        {/* ERROR */}
        {error && (

          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              borderRadius: "10px",
              background: "#ffeded",
              color: "#b00020",
              textAlign: "center",
            }}
          >
            {error}
          </div>

        )}

        {/* EXAMPLES */}
        <section className="gallery-section">

          <div className="section-title">

            <div>

              <span className="small-label">
                EXPLORE EXAMPLES
              </span>

              <h2>
                Or choose an interface
              </h2>

            </div>

            <span className="example-count">
              {demos.length} visual examples
            </span>

          </div>

          <div className="gallery">

            {demos.map((demo) => (

              <button
                key={demo.name}
                className={`gallery-card ${
                  selected.name === demo.name
                    ? "selected"
                    : ""
                } ${demo.color}`}
                onClick={() => {
                  setSelected(demo);
                  setShowResults(false);
                  setFindings([]);
                }}
              >

                <div className="mini-browser">

                  <div className="browser-dots">

                    <span></span>
                    <span></span>
                    <span></span>

                  </div>

                  <div className="mini-content">

                    <div className="mini-logo">
                      {demo.icon}
                    </div>

                    <div className="mini-lines">

                      <span></span>
                      <span></span>

                    </div>

                    <div className="mini-product">

                      <div className="product-shape">
                        {demo.icon}
                      </div>

                      <div className="product-text">

                        <span></span>
                        <span></span>
                        <span></span>

                      </div>

                    </div>

                    <div className="mini-button">

                      {demo.type === "Shopping"
                        ? "BUY NOW"
                        : demo.type === "Travel"
                        ? "BOOK NOW"
                        : demo.type === "Streaming"
                        ? "START FREE"
                        : "GET TICKETS"}

                    </div>

                  </div>

                </div>

                <div className="gallery-info">

                  <div>

                    <strong>
                      {demo.name}
                    </strong>

                    <small>
                      {demo.type}
                    </small>

                  </div>

                  <span className="arrow">
                    ↗
                  </span>

                </div>

              </button>

            ))}

          </div>

        </section>

        {/* WORKSPACE */}
        <section className="workspace">

          {/* LEFT */}
          <div className="visual-card">

            <div className="card-heading">

              <div>

                <span className="step-label">
                  STEP 01
                </span>

                <h2>
                  Interface preview
                </h2>

                <p>
                  {uploadedImage
                    ? "Uploaded screenshot"
                    : "Upload a screenshot to begin"}
                </p>

              </div>

              <div className="risk-badge">

                <span>
                  FINDINGS
                </span>

                <strong>
                  {findings.length}
                </strong>

              </div>

            </div>

            <div className="mock-website">

              {uploadedImage ? (

                <div
                  className="real-image-container"
                  style={{
                    position: "relative",
                  }}
                >

                  <img
                    src={uploadedImage}
                    alt="Analyzed interface"
                    style={{
                      width: "100%",
                      display: "block",
                    }}
                  />

                  {showResults &&
                    findings.map((finding, index) => {

                      if (!finding.location) return null;

                      return (
                        <button
                          key={index}
                          className={`hotspot ${
                            activeFinding === index
                              ? "active"
                              : ""
                          }`}
                          style={{
                            position: "absolute",
                            left: `${finding.location.x}px`,
                            top: `${finding.location.y}px`,
                            width: `${finding.location.width}px`,
                            height: `${finding.location.height}px`,
                          }}
                          onClick={() =>
                            setActiveFinding(index)
                          }
                        >
                          {String(index + 1).padStart(2, "0")}
                        </button>
                      );

                    })}

                </div>

              ) : (

                <div className={`mock-website-placeholder ${selected.color}`}>

                  <div className="fake-browser">

                    <div className="browser-controls">

                      <span></span>
                      <span></span>
                      <span></span>

                    </div>

                    <div className="address-bar">
                      example.com
                    </div>

                    <div className="browser-menu">
                      ☰
                    </div>

                  </div>

                  <div className="fake-page">

                    <nav className="fake-nav">

                      <strong>
                        {selected.icon} BRAND
                      </strong>

                      <div>
                        Home&nbsp;&nbsp;
                        Products&nbsp;&nbsp;
                        Deals
                      </div>

                      <button>
                        Cart 🛒
                      </button>

                    </nav>

                    <div className="fake-hero">

                      <div className="hero-copy">

                        <div className="fake-tag">
                          ⭐ SPECIAL OFFER
                        </div>

                        <h3>
                          {selected.name}
                        </h3>

                        <p>
                          Select an image above to analyze it.
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              )}

              {scanning && (

                <div className="scan-line">

                  <span>
                    AI SCANNING...
                  </span>

                </div>

              )}

            </div>

            <button
              className="scan-button"
              onClick={runScan}
              disabled={scanning || !selectedFile}
            >

              {scanning ? (

                <>
                  <span className="button-spinner"></span>
                  AI IS SCANNING...
                </>

              ) : (

                <>
                  🔍 RUN AI SCAN
                  <span>→</span>
                </>

              )}

            </button>

          </div>

          {/* RIGHT */}
          <div className="results-card">

            <div className="results-top">

              <div>

                <span className="step-label">
                  STEP 02
                </span>

                <h2>
                  Pressure points
                </h2>

              </div>

              <div className="score-circle">

                <strong>
                  {findings.length}
                </strong>

                <span>
                  found
                </span>

              </div>

            </div>

            {!showResults ? (

              <div className="waiting">

                <div className="waiting-icon">
                  🧠
                </div>

                <h3>
                  Ready to investigate
                </h3>

                <p>
                  Upload a screenshot and run the AI scan
                  to reveal potentially manipulative
                  interface patterns.
                </p>

              </div>

            ) : findings.length === 0 ? (

              <div className="waiting">

                <div className="waiting-icon">
                  🛡️
                </div>

                <h3>
                  No patterns detected
                </h3>

                <p>
                  No potentially manipulative interface
                  patterns were detected in this screenshot.
                </p>

              </div>

            ) : (

              <div className="findings">

                {findings.map((finding, index) => (

                  <button
                    key={index}
                    className={`finding ${
                      activeFinding === index
                        ? "active-finding"
                        : ""
                    }`}
                    onClick={() =>
                      setActiveFinding(index)
                    }
                  >

                    <div className="finding-number">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="finding-content">

                      <strong>
                        {formatType(finding.type)}
                      </strong>

                      <p>
                        {finding.evidence}
                      </p>

                      <small>
                        {finding.explanation}
                      </small>

                      <small>
                        Confidence:{" "}
                        {Math.round(
                          (finding.confidence || 0) * 100
                        )}
                        %
                      </small>

                    </div>

                    <span className="finding-arrow">
                      →
                    </span>

                  </button>

                ))}

              </div>

            )}

          </div>

        </section>

        {/* DISCLAIMER */}
        <section
          style={{
            marginTop: "30px",
            padding: "18px 22px",
            borderRadius: "14px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            fontSize: "13px",
            lineHeight: "1.6",
            opacity: 0.8,
          }}
        >
          <strong>Note:</strong> Pressure Point identifies potentially
          manipulative interface patterns based on observable visual
          and textual evidence. Detection does not establish deceptive
          intent.
        </section>

        {/* STATS */}
        <section className="stats">

          <div className="stat-card orange-stat">

            <span>🎯</span>

            <div>
              <strong>{findings.length}</strong>
              <small>Patterns detected</small>
            </div>

          </div>

          <div className="stat-card cyan-stat">

            <span>🧠</span>

            <div>
              <strong>AI</strong>
              <small>Visual analysis</small>
            </div>

          </div>

          <div className="stat-card pink-stat">

            <span>⚡</span>

            <div>
              <strong>
                {scanning ? "SCAN" : "READY"}
              </strong>
              <small>Analysis status</small>
            </div>

          </div>

          <div className="stat-card green-stat">

            <span>🛡️</span>

            <div>
              <strong>SAFE</strong>
              <small>Awareness focused</small>
            </div>

          </div>

        </section>

      </main>

      <footer>
        PRESSURE POINT • Making digital interfaces easier to understand
      </footer>

    </div>
  );
}

export default App;