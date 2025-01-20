import './index.css'
import Cookies from 'js-cookie'

import {Link, withRouter} from 'react-router-dom'

const Header = props => {
  const remove = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <nav className="nav-bar">
      <Link to="/">
        <img
          alt="website logo"
          className="website-logo"
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
        />
      </Link>
      <button onClick={remove} className="logout-btn" type="button">
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
