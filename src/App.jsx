import React from "react";
import { useState } from "react";
import "./App.css";

const demos = [
  {
    name: "Flash Sale",
    type: "Shopping",
    icon: "🛍️",
    color: "orange",
    score: 91,
    title: "MEGA SUMMER SALE",
    subtitle: "Everything you love, at special prices!",
    findings: [
      "Countdown timer creates urgency",
      "Limited-stock message may pressure users",
      "Bright discount button draws attention"
    ]
  },
  {
    name: "Travel Booking",
    type: "Travel",
    icon: "✈️",
    color: "cyan",
    score: 76,
    title: "BOOK YOUR DREAM TRIP",
    subtitle: "Your perfect holiday is waiting!",
    findings: [
      "Only 2 rooms left message",
      "Price increase warning",
      "Urgency-focused booking button"
    ]
  },
  {
    name: "Subscription",
    type: "Streaming",
    icon: "🎬",
    color: "pink",
    score: 68,
    title: "CHOOSE YOUR PLAN",
    subtitle: "Start watching today",
    findings: [
      "Premium option receives visual emphasis",
      "Free option is less prominent",
      "Trial language may encourage quick decisions"
    ]
  },
  {
    name: "Concert Tickets",
    type: "Events",
    icon: "🎟️",
    color: "green",
    score: 84,
    title: "LIVE MUSIC TONIGHT",
    subtitle: "Don't miss the experience!",
    findings: [
      "Ticket availability warning",
      "Countdown creates urgency",
      "Large purchase button"
    ]
  }
];

function App() {
  const [selected, setSelected] = useState(demos[0]);
  const [scanning, setScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeFinding, setActiveFinding] = useState(0);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
      setShowResults(false);
    }
  };

  const runScan = () => {
    setScanning(true);
    setShowResults(false);

    setTimeout(() => {
      setScanning(false);
      setShowResults(true);
    }, 1800);
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
          <div className="brand-mark">🎯</div>

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
                  <span>AI SCANNING...</span>
                </div>
              )}

            </div>

          </section>
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
                  Selected: {selected.name}
                </p>

              </div>

              <div className="risk-badge">

                <span>
                  RISK
                </span>

                <strong>
                  {selected.score}
                </strong>

              </div>

            </div>

            <div
              className={`mock-website ${selected.color}`}
            >

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
                      {selected.title}
                    </h3>

                    <p>
                      {selected.subtitle}
                    </p>

                    <div className="fake-price">

                      <strong>
                        ₹1,499
                      </strong>

                      <del>
                        ₹2,999
                      </del>

                    </div>

                    <button className="fake-buy">

                      {selected.type === "Shopping"
                        ? "GET IT NOW →"
                        : selected.type === "Travel"
                        ? "BOOK NOW →"
                        : selected.type === "Streaming"
                        ? "START WATCHING →"
                        : "BUY TICKETS →"}

                    </button>

                  </div>

                  <div className="graphic-object">

                    <div className="graphic-circle">
                      {selected.icon}
                    </div>

                    <div className="floating-star star-one">
                      ✦
                    </div>

                    <div className="floating-star star-two">
                      ★
                    </div>

                    <div className="floating-star star-three">
                      ✧
                    </div>

                  </div>

                </div>

                <div className="pressure-row">

                  <div className="pressure-box">

                    <span>🔥</span>

                    <strong>
                      Only 2 left!
                    </strong>

                    <small>
                      Almost gone
                    </small>

                  </div>

                  <div className="pressure-box countdown">

                    <span>⏰</span>

                    <strong>
                      09:42
                    </strong>

                    <small>
                      Offer ends soon
                    </small>

                  </div>

                  <div className="pressure-box">

                    <span>👥</span>

                    <strong>
                      17 people
                    </strong>

                    <small>
                      viewing this
                    </small>

                  </div>

                </div>

                {scanning && (
                  <div className="scan-line">
                    <span>
                      AI SCANNING...
                    </span>
                  </div>
                )}

                {showResults && (

                  <>
                    <button
                      className={`hotspot hotspot-one ${
                        activeFinding === 0
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        setActiveFinding(0)
                      }
                    >
                      01
                    </button>

                    <button
                      className={`hotspot hotspot-two ${
                        activeFinding === 1
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        setActiveFinding(1)
                      }
                    >
                      02
                    </button>

                    <button
                      className={`hotspot hotspot-three ${
                        activeFinding === 2
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        setActiveFinding(2)
                      }
                    >
                      03
                    </button>
                  </>

                )}

              </div>

            </div>

            <button
              className="scan-button"
              onClick={runScan}
              disabled={scanning}
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
                  {selected.score}
                </strong>

                <span>
                  /100
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
                  Run the AI scan to reveal potentially
                  manipulative interface patterns.
                </p>

              </div>

            ) : (

              <div className="findings">

                {selected.findings.map(
                  (finding, index) => (

                    <button
                      key={finding}
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
                        0{index + 1}
                      </div>

                      <div className="finding-content">

                        <strong>
                          {finding}
                        </strong>

                        <p>
                          Potential influence pattern detected
                        </p>

                      </div>

                      <span className="finding-arrow">
                        →
                      </span>

                    </button>

                  )
                )}

              </div>

            )}

          </div>

        </section>

        {/* STATS */}
        <section className="stats">

          <div className="stat-card orange-stat">

            <span>🎯</span>

            <div>
              <strong>3</strong>
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
              <strong>LIVE</strong>
              <small>Interactive scanning</small>
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