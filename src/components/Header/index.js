import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

const Header = props => {
  const onLogoutButton = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <div className="logo-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-website-logo"
          />
        </Link>
      </div>

      <ul className="links-container">
        <li className="nav-link">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-link">
          <Link to="/jobs">Jobs</Link>
        </li>
      </ul>
      <div className="button-container">
        <button
          className="logout-button"
          type="button"
          onClick={onLogoutButton}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
