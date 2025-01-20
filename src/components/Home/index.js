import {Component} from 'react'
import Header from '../Header'

import './index.css'

class Home extends Component {
  renderHomePage = () => (
    <div className="home-page-content">
      <h1 className="home-heading">Your Flexibility, Our Excellence</h1>
      <img
        className="digital-card-img"
        alt="digital card"
        src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
      />
    </div>
  )

  render() {
    return (
      <div>
        <Header />
        {this.renderHomePage()}
      </div>
    )
  }
}
export default Home
