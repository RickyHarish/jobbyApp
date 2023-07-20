// import Cookies from 'js-cookie'

const Home = props => {
  const routeToJobs = () => {
    const {history} = props
    history.push('/jobs')
  }

  return (
    <div className="home-container">
      <h1 className="home-heading">Fine The Job That Fits For Your Life</h1>
      <p className="home-des">
        Millions of people searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <button className="home-button" type="button" onClick={routeToJobs}>
        Find Jobs
      </button>
    </div>
  )
}

export default Home
