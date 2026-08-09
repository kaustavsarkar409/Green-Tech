import {
  Upload,
  Camera,
  CheckCircle2,
  XCircle,
  Sparkles,
  Image as ImageIcon,
  Award,
  Recycle,
  RotateCcw
} from "lucide-react"
import { useState } from "react"

function WasteVerification() {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [claimedType, setClaimedType] = useState("Plastic")
  const [result, setResult] = useState(null)

  const handleImage = (event) => {
    const file = event.target.files[0]

    if (!file) return

    setImage(file)
    setPreview(URL.createObjectURL(file))
    setResult(null)
  }

  const verifyWaste = () => {
    if (!image) return

    // Demo result for now.
    // This will later call POST /api/waste-logs
    const isCorrect = claimedType === "Plastic"

    setResult({
      detected: isCorrect ? claimedType : "Organic",
      confidence: isCorrect ? 91 : 78,
      correct: isCorrect,
      points: isCorrect ? 10 : -5
    })
  }

  const reset = () => {
    setImage(null)
    setPreview(null)
    setResult(null)
  }

  return (
    <div className="verification-page">

      {/* HEADER */}

      <div className="page-heading">
        <div>
          <span className="eyebrow">AI-ASSISTED VERIFICATION</span>

          <h1>Waste Verification</h1>

          <p>
            Verify waste segregation using image-based classification.
          </p>
        </div>

        <div className="verification-status">
          <Sparkles size={15} />
          Prototype AI
        </div>
      </div>


      {/* MAIN */}

      <div className="verification-grid">

        {/* UPLOAD */}

        <div className="dashboard-card upload-card">

          <div className="card-header">
            <div>
              <h3>Submit Waste Sample</h3>
              <p>Upload a clear photo of the waste item.</p>
            </div>

            <Camera size={20} />
          </div>


          {!preview ? (

            <label className="upload-zone">

              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
              />

              <div className="upload-icon">
                <Upload size={25} />
              </div>

              <strong>Upload waste image</strong>

              <span>
                Drag & drop or click to browse
              </span>

              <small>
                JPG, PNG or WEBP • Max 5 MB
              </small>

            </label>

          ) : (

            <div className="image-preview">

              <img
                src={preview}
                alt="Waste sample"
              />

              <button
                className="remove-image"
                onClick={reset}
              >
                <RotateCcw size={14} />
                Change image
              </button>

            </div>

          )}


          {/* WASTE TYPE */}

          <div className="type-selection">

            <label>What type are you claiming?</label>

            <div className="type-options">

              {[
                "Plastic",
                "Paper",
                "Metal",
                "E-waste",
                "Organic"
              ].map((type) => (

                <button
                  key={type}
                  className={
                    claimedType === type
                      ? "type-option active"
                      : "type-option"
                  }
                  onClick={() => setClaimedType(type)}
                >
                  <Recycle size={14} />
                  {type}
                </button>

              ))}

            </div>

          </div>


          <button
            className="verify-button"
            disabled={!image}
            onClick={verifyWaste}
          >
            <Sparkles size={16} />
            Verify Waste
          </button>

        </div>


        {/* RESULT */}

        <div className="dashboard-card result-card">

          <div className="card-header">
            <div>
              <h3>Verification Result</h3>
              <p>Classification and reward outcome</p>
            </div>

            <Award size={20} />
          </div>


          {!result ? (

            <div className="empty-result">

              <div className="empty-result-icon">
                <ImageIcon size={28} />
              </div>

              <strong>No verification yet</strong>

              <span>
                Upload a waste image and run verification
                to see the classification result.
              </span>

            </div>

          ) : (

            <div className="result-content">

              {/* RESULT STATUS */}

              <div
                className={
                  result.correct
                    ? "result-banner success"
                    : "result-banner incorrect"
                }
              >

                {result.correct ? (
                  <CheckCircle2 size={22} />
                ) : (
                  <XCircle size={22} />
                )}

                <div>

                  <strong>
                    {result.correct
                      ? "Correct Segregation"
                      : "Incorrect Segregation"}
                  </strong>

                  <span>
                    {result.correct
                      ? "The submitted waste matches the claimed category."
                      : "The detected category does not match the claim."}
                  </span>

                </div>

              </div>


              {/* CLASSIFICATION */}

              <div className="classification-box">

                <div>
                  <span>Claimed Type</span>
                  <strong>{claimedType}</strong>
                </div>

                <div className="classification-arrow">
                  →
                </div>

                <div>
                  <span>Detected Type</span>
                  <strong>{result.detected}</strong>
                </div>

              </div>


              {/* CONFIDENCE */}

              <div className="confidence-section">

                <div className="confidence-header">
                  <span>Classification Confidence</span>
                  <strong>{result.confidence}%</strong>
                </div>

                <div className="confidence-bar">
                  <div
                    style={{
                      width: `${result.confidence}%`
                    }}
                  ></div>
                </div>

              </div>


              {/* POINTS */}

              <div
                className={
                  result.correct
                    ? "points-earned positive"
                    : "points-earned negative"
                }
              >

                <div className="points-icon">
                  <Award size={20} />
                </div>

                <div>
                  <span>Citizen reward</span>

                  <strong>
                    {result.points > 0 ? "+" : ""}
                    {result.points} points
                  </strong>
                </div>

              </div>


              <button
                className="new-verification"
                onClick={reset}
              >
                <RotateCcw size={14} />
                Verify another sample
              </button>

            </div>

          )}

        </div>

      </div>


      {/* HOW IT WORKS */}

      <div className="dashboard-card verification-flow">

        <div className="flow-title">
          <h3>How verification works</h3>
          <p>The CWMS segregation workflow</p>
        </div>

        <div className="verification-steps">

          <div className="verification-step">
            <div className="step-number">1</div>
            <div>
              <strong>Citizen uploads</strong>
              <span>Waste image submitted</span>
            </div>
          </div>

          <div className="step-arrow">→</div>

          <div className="verification-step">
            <div className="step-number">2</div>
            <div>
              <strong>Classification</strong>
              <span>Waste category detected</span>
            </div>
          </div>

          <div className="step-arrow">→</div>

          <div className="verification-step">
            <div className="step-number">3</div>
            <div>
              <strong>Verification</strong>
              <span>Claim compared with result</span>
            </div>
          </div>

          <div className="step-arrow">→</div>

          <div className="verification-step">
            <div className="step-number">4</div>
            <div>
              <strong>Reward</strong>
              <span>Points added or deducted</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}

export default WasteVerification