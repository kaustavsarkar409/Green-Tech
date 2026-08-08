import {
  Search,
  Plus,
  Recycle,
  ShoppingCart,
  Package,
  TrendingUp,
  MapPin,
  ArrowUpRight,
  X,
} from "lucide-react"
import { useState } from "react"

const initialListings = [
  {
    id: 1,
    seller: "GreenCycle Industries",
    wasteType: "Plastic",
    quantity: 184,
    price: 28,
    location: "Sector 5",
    status: "Available",
  },
  {
    id: 2,
    seller: "EcoWorks Recycler",
    wasteType: "Paper",
    quantity: 320,
    price: 18,
    location: "Sector 2",
    status: "Available",
  },
  {
    id: 3,
    seller: "Urban Metal Recovery",
    wasteType: "Metal",
    quantity: 95,
    price: 72,
    location: "Sector 8",
    status: "Available",
  },
  {
    id: 4,
    seller: "TechCycle",
    wasteType: "E-waste",
    quantity: 64,
    price: 145,
    location: "Sector 4",
    status: "Available",
  },
  {
    id: 5,
    seller: "Organic Renew",
    wasteType: "Organic",
    quantity: 410,
    price: 9,
    location: "Sector 7",
    status: "Available",
  },
]

function Marketplace() {
  const [listings, setListings] = useState(initialListings)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")
  const [showCreate, setShowCreate] = useState(false)
  const [message, setMessage] = useState("")

  const [newListing, setNewListing] = useState({
    wasteType: "Plastic",
    quantity: "",
    price: "",
  })

  const filteredListings = listings.filter((item) => {
    const matchesSearch =
      item.seller.toLowerCase().includes(search.toLowerCase()) ||
      item.wasteType.toLowerCase().includes(search.toLowerCase())

    const matchesFilter =
      filter === "All" || item.wasteType === filter

    return matchesSearch && matchesFilter
  })

  const buyListing = (item) => {
    setMessage(
      `${item.wasteType} listing selected. Purchase flow ready for backend connection.`
    )
  }

  const createListing = () => {
    if (!newListing.quantity || !newListing.price) return

    const listing = {
      id: Date.now(),
      seller: "Your Organization",
      wasteType: newListing.wasteType,
      quantity: Number(newListing.quantity),
      price: Number(newListing.price),
      location: "Your Area",
      status: "Available",
    }

    setListings([listing, ...listings])
    setShowCreate(false)
    setNewListing({
      wasteType: "Plastic",
      quantity: "",
      price: "",
    })

    setMessage("New marketplace listing created.")
  }

  return (
    <div className="marketplace-page">

      {/* HEADER */}

      <div className="page-heading">
        <div>
          <span className="eyebrow">CIRCULAR ECONOMY</span>

          <h1>Recyclable Marketplace</h1>

          <p>
            Connect recyclable waste with buyers and recycling partners.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowCreate(true)}
        >
          <Plus size={16} />
          Create Listing
        </button>
      </div>


      {/* MARKET STATS */}

      <div className="market-stats">

        <div className="market-stat">
          <div className="market-stat-icon">
            <Package size={19} />
          </div>

          <div>
            <strong>1,073 kg</strong>
            <span>Available Material</span>
          </div>
        </div>

        <div className="market-stat">
          <div className="market-stat-icon">
            <ShoppingCart size={19} />
          </div>

          <div>
            <strong>₹38.4K</strong>
            <span>Transaction Volume</span>
          </div>
        </div>

        <div className="market-stat">
          <div className="market-stat-icon">
            <Recycle size={19} />
          </div>

          <div>
            <strong>24</strong>
            <span>Active Sellers</span>
          </div>
        </div>

        <div className="market-stat">
          <div className="market-stat-icon">
            <TrendingUp size={19} />
          </div>

          <div>
            <strong>+12.8%</strong>
            <span>Monthly Growth</span>
          </div>
        </div>

      </div>


      {/* MESSAGE */}

      {message && (
        <div className="market-message">
          <Recycle size={15} />
          {message}
        </div>
      )}


      {/* MARKETPLACE */}

      <div className="dashboard-card marketplace-card">

        <div className="market-toolbar">

          <div className="search-box">
            <Search size={15} />

            <input
              placeholder="Search recyclable material..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>


          <div className="market-filters">

            {[
              "All",
              "Plastic",
              "Paper",
              "Metal",
              "E-waste",
              "Organic",
            ].map((type) => (

              <button
                key={type}
                className={
                  filter === type
                    ? "market-filter active"
                    : "market-filter"
                }
                onClick={() => setFilter(type)}
              >
                {type}
              </button>

            ))}

          </div>

        </div>


        {/* LISTINGS */}

        <div className="listing-grid">

          {filteredListings.map((item) => (

            <div className="listing-card" key={item.id}>

              <div className="listing-top">

                <div className="listing-waste-icon">
                  <Recycle size={21} />
                </div>

                <span className="available-badge">
                  AVAILABLE
                </span>

              </div>


              <div className="listing-title">

                <span>{item.wasteType}</span>

                <h3>
                  {item.quantity} kg available
                </h3>

              </div>


              <div className="listing-price">

                <strong>
                  ₹{item.price}
                  <small>/kg</small>
                </strong>

                <span>
                  Total value ₹
                  {(item.quantity * item.price).toLocaleString()}
                </span>

              </div>


              <div className="listing-seller">

                <div className="seller-avatar">
                  {item.seller.charAt(0)}
                </div>

                <div>
                  <strong>{item.seller}</strong>

                  <span>
                    <MapPin size={9} />
                    {item.location}
                  </span>
                </div>

              </div>


              <button
                className="buy-button"
                onClick={() => buyListing(item)}
              >
                <ShoppingCart size={14} />
                Buy Material
                <ArrowUpRight size={13} />
              </button>

            </div>

          ))}

        </div>


        {filteredListings.length === 0 && (
          <div className="no-listings">
            <Package size={28} />
            <strong>No listings found</strong>
            <span>Try another search or category.</span>
          </div>
        )}

      </div>


      {/* CREATE LISTING MODAL */}

      {showCreate && (

        <div
          className="modal-overlay"
          onClick={() => setShowCreate(false)}
        >

          <div
            className="listing-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="modal-header">

              <div>
                <h3>Create Listing</h3>
                <p>Sell recyclable material to verified buyers.</p>
              </div>

              <button
                className="close-modal"
                onClick={() => setShowCreate(false)}
              >
                <X size={17} />
              </button>

            </div>


            <div className="modal-field">

              <label>Waste Type</label>

              <select
                value={newListing.wasteType}
                onChange={(e) =>
                  setNewListing({
                    ...newListing,
                    wasteType: e.target.value,
                  })
                }
              >
                <option>Plastic</option>
                <option>Paper</option>
                <option>Metal</option>
                <option>E-waste</option>
                <option>Organic</option>
              </select>

            </div>


            <div className="modal-field">

              <label>Quantity (kg)</label>

              <input
                type="number"
                placeholder="e.g. 150"
                value={newListing.quantity}
                onChange={(e) =>
                  setNewListing({
                    ...newListing,
                    quantity: e.target.value,
                  })
                }
              />

            </div>


            <div className="modal-field">

              <label>Price per kg (₹)</label>

              <input
                type="number"
                placeholder="e.g. 25"
                value={newListing.price}
                onChange={(e) =>
                  setNewListing({
                    ...newListing,
                    price: e.target.value,
                  })
                }
              />

            </div>


            <button
              className="create-listing-button"
              onClick={createListing}
            >
              <Plus size={15} />
              Publish Listing
            </button>

          </div>

        </div>

      )}

    </div>
  )
}

export default Marketplace