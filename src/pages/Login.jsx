function Login() {
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="brand">
          <div className="brand-icon">♻</div>
          <h1>CWMS</h1>
          <p>Community Waste Management System</p>
        </div>

        <form>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
          />

          <button type="submit">
            Sign In
          </button>
        </form>

        <p className="login-footer">
          Building cleaner communities together.
        </p>
      </div>
    </div>
  )
}

export default Login