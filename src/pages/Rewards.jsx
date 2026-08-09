import {
  BusFront,
  TrainFront,
  TramFront,
  WalletCards,
  ArrowRight,
  CheckCircle2,
  Leaf,
  Coffee,
  ShoppingBag,
  HeartPulse,
  Gift,
  History,
  Store,
  Ticket,
  MapPin
} from "lucide-react"

import { useState } from "react"

import "./Rewards.css"

function Rewards() {
  const [category, setCategory] = useState("All Rewards")
  const [walletConnected, setWalletConnected] = useState(false)
  const [transitType, setTransitType] = useState("bus")
  const [message, setMessage] = useState("")

  const points = 12450

  const categories = [
    "All Rewards",
    "Transit",
    "Restaurants",
    "Local Shops",
    "Healthcare"
  ]

  const transitOptions = [
    {
      id: "bus",
      name: "City Bus",
      description: "Bus rides across the city",
      icon: BusFront
    },
    {
      id: "train",
      name: "Metro / Train",
      description: "Metro and local train travel",
      icon: TrainFront
    },
    {
      id: "shuttle",
      name: "Municipal Shuttle",
      description: "City shuttle services",
      icon: TramFront
    }
  ]

  const rewards = [
    {
      category: "Restaurants",
      title: "₹100 Restaurant Voucher",
      description: "Use at participating local restaurants and cafés.",
      points: 1000,
      icon: Coffee,
      label: "LOCAL FOOD"
    },
    {
      category: "Restaurants",
      title: "Free Artisan Coffee",
      description: "Redeem for one regular beverage at a partner café.",
      points: 500,
      icon: Coffee,
      label: "CAFÉ"
    },
    {
      category: "Local Shops",
      title: "₹250 Local Store Voucher",
      description: "Spend your points at participating neighborhood stores.",
      points: 2500,
      icon: ShoppingBag,
      label: "LOCAL SHOP"
    },
    {
      category: "Healthcare",
      title: "Jan Aushadhi Benefit",
      description:
        "View participating Jan Aushadhi Kendras and available program benefits.",
      points: 1000,
      icon: HeartPulse,
      label: "HEALTHCARE"
    },
    {
      category: "Local Shops",
      title: "Green Store Voucher",
      description: "Get discounts on selected sustainable products.",
      points: 1500,
      icon: Store,
      label: "ECO STORE"
    },
    {
      category: "All Rewards",
      title: "Green Living Reward",
      description: "Unlock selected community sustainability offers.",
      points: 750,
      icon: Gift,
      label: "GREEN"
    }
  ]

  const visibleRewards =
    category === "All Rewards"
      ? rewards
      : rewards.filter((reward) => reward.category === category)

  const redeem = (title) => {
    setMessage(`${title} selected for redemption.`)

    setTimeout(() => {
      setMessage("")
    }, 3500)
  }

  return (
    <div className="rewards-page">

      {/* HEADER */}

      <div className="rewards-page-header">

        <div>
          <span className="rewards-eyebrow">
            COMMUNITY REWARDS
          </span>

          <h1>
            Make your points work for you.
          </h1>

          <p>
            Turn responsible waste management into useful everyday benefits —
            from public transport to local businesses and community services.
          </p>
        </div>

        <button className="history-button">
          <History size={15} />
          Reward History
        </button>

      </div>


      {/* BALANCE */}

      <div className="rewards-balance">

        <div className="balance-main">

          <div className="balance-icon">
            <Leaf size={23} />
          </div>

          <div>
            <span>
              CURRENT BALANCE
            </span>

            <strong>
              {points.toLocaleString()}
              <small> pts</small>
            </strong>

            <p>
              +450 points earned this week from recycling
            </p>
          </div>

        </div>

        <div className="balance-stat">
          <span>
            RESPONSIBLE ACTIONS
          </span>

          <strong>
            18
          </strong>

          <small>
            this month
          </small>
        </div>

      </div>


      {/* CATEGORY BAR */}

      <div className="reward-category-bar">

        {categories.map((item) => (

          <button
            key={item}
            className={
              category === item
                ? "category-button active"
                : "category-button"
            }
            onClick={() => setCategory(item)}
          >
            {item}
          </button>

        ))}

      </div>


      {/* TRANSIT WALLET */}

      {(category === "All Rewards" || category === "Transit") && (

        <section className="transit-card">

          <div className="transit-card-header">

            <div>

              <span className="rewards-eyebrow">
                SUSTAINABLE MOBILITY
              </span>

              <h2>
                Transit Wallet
              </h2>

              <p>
                Use EcoPoints for bus, train and municipal shuttle travel.
              </p>

            </div>

            <div className="transit-wallet-icon">
              <WalletCards size={23} />
            </div>

          </div>


          {!walletConnected ? (

            <div className="wallet-connect-box">

              <div className="wallet-small-icon">
                <WalletCards size={20} />
              </div>

              <div className="wallet-connect-info">

                <strong>
                  Connect your transit account
                </strong>

                <span>
                  Link your city transit wallet to redeem EcoPoints
                  for travel credit.
                </span>

              </div>

              <button
                className="connect-wallet-button"
                onClick={() => setWalletConnected(true)}
              >
                Connect Wallet
                <ArrowRight size={15} />
              </button>

            </div>

          ) : (

            <>

              <div className="wallet-connected-box">

                <div className="wallet-account">

                  <div className="wallet-account-icon">
                    <WalletCards size={17} />
                  </div>

                  <div>
                    <span>
                      Connected transit account
                    </span>

                    <strong>
                      CityMove •••• 4821
                    </strong>
                  </div>

                </div>

                <div className="wallet-status">
                  <CheckCircle2 size={14} />
                  Connected
                </div>

              </div>


              <div className="transit-content">

                <div className="transit-types">

                  <h3>
                    Choose your transit
                  </h3>

                  <div className="transit-type-list">

                    {transitOptions.map((option) => {

                      const Icon = option.icon

                      return (
                        <button
                          key={option.id}
                          className={
                            transitType === option.id
                              ? "transit-type selected"
                              : "transit-type"
                          }
                          onClick={() =>
                            setTransitType(option.id)
                          }
                        >

                          <div className="transit-type-icon">
                            <Icon size={19} />
                          </div>

                          <div>
                            <strong>
                              {option.name}
                            </strong>

                            <span>
                              {option.description}
                            </span>
                          </div>

                          {transitType === option.id && (
                            <CheckCircle2
                              size={16}
                              className="selected-check"
                            />
                          )}

                        </button>
                      )

                    })}

                  </div>

                </div>


                <div className="transit-credit">

                  <h3>
                    Redeem transit credit
                  </h3>

                  <div className="credit-grid">

                    {[50, 100, 250].map((value) => {

                      const requiredPoints = value * 10

                      return (
                        <button
                          key={value}
                          className="credit-card"
                          onClick={() =>
                            redeem(`₹${value} transit credit`)
                          }
                        >

                          <strong>
                            ₹{value}
                          </strong>

                          <span>
                            {requiredPoints.toLocaleString()} pts
                          </span>

                          <small>
                            Redeem
                            <ArrowRight size={12} />
                          </small>

                        </button>
                      )

                    })}

                  </div>

                </div>

              </div>

            </>

          )}

        </section>

      )}


      {/* REWARD LIST */}

      {(category !== "Transit") && (

        <section className="voucher-section">

          <div className="voucher-section-header">

            <div>

              <span className="rewards-eyebrow">
                COMMUNITY BENEFITS
              </span>

              <h2>
                {category === "All Rewards"
                  ? "Vouchers & Benefits"
                  : category}
              </h2>

            </div>

            <span className="reward-count">
              {visibleRewards.length} available
            </span>

          </div>


          <div className="voucher-grid">

            {visibleRewards.map((reward) => {

              const Icon = reward.icon

              return (
                <div
                  className="voucher-card"
                  key={reward.title}
                >

                  <div className="voucher-image">

                    <div className="voucher-icon">
                      <Icon size={24} />
                    </div>

                    <span>
                      {reward.points.toLocaleString()} pts
                    </span>

                  </div>


                  <div className="voucher-body">

                    <small>
                      {reward.label}
                    </small>

                    <h3>
                      {reward.title}
                    </h3>

                    <p>
                      {reward.description}
                    </p>

                    <button
                      className="redeem-button"
                      onClick={() => redeem(reward.title)}
                    >
                      Redeem Reward
                      <ArrowRight size={14} />
                    </button>

                  </div>

                </div>
              )

            })}

          </div>

        </section>

      )}


      {/* JAN AUSHADHI / CIVIC NOTE */}

      {(category === "All Rewards" ||
        category === "Healthcare") && (

        <section className="healthcare-note">

          <div className="healthcare-icon">
            <HeartPulse size={21} />
          </div>

          <div>

            <strong>
              Healthcare & Jan Aushadhi
            </strong>

            <p>
              Explore nearby Jan Aushadhi Kendras and eligible community
              benefits. Availability and redemption rules depend on the
              participating program.
            </p>

          </div>

          <button className="outline-small-button">
            <MapPin size={14} />
            Find Nearby
          </button>

        </section>

      )}


      {/* REWARD HISTORY */}

      <section className="reward-history-strip">

        <div className="history-strip-icon">
          <Ticket size={18} />
        </div>

        <div>

          <strong>
            Your rewards are linked to your impact
          </strong>

          <span>
            Every verified recycling action contributes to your EcoPoints balance.
          </span>

        </div>

        <button>
          View History
          <ArrowRight size={14} />
        </button>

      </section>


      {/* SUCCESS MESSAGE */}

      {message && (

        <div className="reward-toast">

          <CheckCircle2 size={18} />

          <span>
            {message}
          </span>

        </div>

      )}

    </div>
  )
}

export default Rewards