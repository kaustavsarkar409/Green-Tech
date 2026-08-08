import {
  Award,
  Gift,
  Leaf,
  ShoppingBag,
  Coffee,
  Ticket,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Sparkles,
} from "lucide-react"
import { useState } from "react"

const rewards = [
  {
    id: 1,
    name: "Eco Store Voucher",
    description: "₹100 voucher for sustainable products",
    points: 500,
    icon: ShoppingBag,
  },
  {
    id: 2,
    name: "Plant a Tree",
    description: "Sponsor one tree through our green partners",
    points: 750,
    icon: Leaf,
  },
  {
    id: 3,
    name: "Coffee Voucher",
    description: "Free beverage at a partner café",
    points: 300,
    icon: Coffee,
  },
  {
    id: 4,
    name: "Movie Ticket",
    description: "Redeem a standard movie ticket",
    points: 900,
    icon: Ticket,
  },
]

const history = [
  {
    reward: "Coffee Voucher",
    points: 300,
    date: "Today",
    status: "Redeemed",
  },
  {
    reward: "Eco Store Voucher",
    points: 500,
    date: "12 Jun 2026",
    status: "Redeemed",
  },
  {
    reward: "Plant a Tree",
    points: 750,
    date: "28 May 2026",
    status: "Processing",
  },
]

function Rewards() {
  const [points, setPoints] = useState(1280)
  const [message, setMessage] = useState("")

  const redeem = (reward) => {
    if (points < reward.points) {
      setMessage(`You need ${reward.points - points} more points.`)
      return
    }

    setPoints(points - reward.points)
    setMessage(`${reward.name} redeemed successfully!`)
  }

  return (
    <div className="rewards-page">

      {/* HEADER */}

      <div className="page-heading">
        <div>
          <span className="eyebrow">CITIZEN REWARDS</span>

          <h1>Rewards & Impact</h1>

          <p>
            Turn responsible waste segregation into meaningful rewards.
          </p>
        </div>

        <div className="reward-level">
          <Sparkles size={14} />
          Eco Champion
        </div>
      </div>


      {/* BALANCE */}

      <div className="rewards-summary">

        <div className="points-card">

          <div className="points-card-icon">
            <Award size={25} />
          </div>

          <div>
            <span>Available Points</span>
            <strong>{points.toLocaleString()}</strong>
            <small>Keep segregating to earn more</small>
          </div>

        </div>


        <div className="impact-card">

          <div className="impact-icon">
            <Leaf size={21} />
          </div>

          <div>
            <span>Waste Diverted</span>
            <strong>42.6 kg</strong>
            <small>From landfill</small>
          </div>

        </div>


        <div className="impact-card">

          <div className="impact-icon">
            <CheckCircle2 size={21} />
          </div>

          <div>
            <span>Segregation Accuracy</span>
            <strong>94%</strong>
            <small>Excellent consistency</small>
          </div>

        </div>

      </div>


      {/* MESSAGE */}

      {message && (
        <div className="reward-message">
          <CheckCircle2 size={16} />
          {message}
        </div>
      )}


      {/* REWARDS */}

      <div className="dashboard-card rewards-list-card">

        <div className="card-header">

          <div>
            <h3>Available Rewards</h3>
            <p>Redeem your points with our sustainability partners.</p>
          </div>

          <Gift size={20} />

        </div>


        <div className="rewards-grid">

          {rewards.map((reward) => {

            const Icon = reward.icon
            const canRedeem = points >= reward.points

            return (
              <div className="reward-item" key={reward.id}>

                <div className="reward-icon">
                  <Icon size={23} />
                </div>

                <div className="reward-info">

                  <strong>{reward.name}</strong>

                  <span>{reward.description}</span>

                  <div className="reward-bottom">

                    <b>
                      {reward.points.toLocaleString()} pts
                    </b>

                    <button
                      disabled={!canRedeem}
                      onClick={() => redeem(reward)}
                    >
                      {canRedeem ? "Redeem" : "Need more"}
                      {canRedeem && <ArrowUpRight size={12} />}
                    </button>

                  </div>

                </div>

              </div>
            )
          })}

        </div>

      </div>


      {/* HOW TO EARN */}

      <div className="dashboard-card earn-card">

        <div className="card-header">
          <div>
            <h3>How to earn points</h3>
            <p>Every responsible action contributes to your score.</p>
          </div>
        </div>

        <div className="earn-grid">

          <div className="earn-item">
            <div className="earn-number">+10</div>
            <div>
              <strong>Correct segregation</strong>
              <span>Verified waste matches your claim.</span>
            </div>
          </div>

          <div className="earn-item">
            <div className="earn-number">+25</div>
            <div>
              <strong>Community collection</strong>
              <span>Participate in a collection drive.</span>
            </div>
          </div>

          <div className="earn-item penalty">
            <div className="earn-number">−5</div>
            <div>
              <strong>Incorrect segregation</strong>
              <span>Points deducted for incorrect claims.</span>
            </div>
          </div>

        </div>

      </div>


      {/* HISTORY */}

      <div className="dashboard-card redemption-card">

        <div className="card-header">

          <div>
            <h3>Redemption History</h3>
            <p>Your recent reward activity.</p>
          </div>

          <Clock size={19} />

        </div>


        <div className="redemption-table">

          <div className="redemption-row redemption-header">
            <span>Reward</span>
            <span>Points</span>
            <span>Date</span>
            <span>Status</span>
          </div>

          {history.map((item, index) => (

            <div className="redemption-row" key={index}>

              <strong>{item.reward}</strong>

              <span>
                −{item.points}
              </span>

              <span>
                {item.date}
              </span>

              <b
                className={
                  item.status === "Redeemed"
                    ? "redeemed-status"
                    : "processing-status"
                }
              >
                {item.status}
              </b>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}

export default Rewards