import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaStar} from 'react-icons/fa'
// import { FaStar } from 'react-icons/fa'
import {RiSuitcaseLine} from 'react-icons/ri'
import {GrLocation} from 'react-icons/gr'

import SimilarJobItem from '../SimilarJobItem'
import Header from '../Header'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetailedView extends Component {
  state = {apiStatus: apiStatusConstant.initial, job: {}}

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        jobDetails: {
          companyLogoUrl: data.job_details.company_log_url,
          companyWebsiteUrl: data.job_details.companyWebsiteUrl,
          employementType: data.job_details.employement_type,
          id: data.job_details.id,
          jobDescription: data.job_details.job_description,
          skills: data.job_details.skills.map(eachSkill => ({
            imageUrl: eachSkill.image_url,
            name: eachSkill.name,
          })),
          lifeAtCompany: {
            description: data.job_details.life_at_company.description,
            imageUrl: data.job_details.life_at_company.description,
          },
          location: data.job_details.location,
          packagePerAnnum: data.job_details.package_per_annum,
          rating: data.job_details.rating,
        },
        similarJobs: data.similar_jobs.map(eachJob => ({
          companyLogoUrl: eachJob.company_logo_url,
          employementType: eachJob.employement_type,
          id: eachJob.id,
          jobDescription: eachJob.job_description,
          location: eachJob.location,
          rating: eachJob.rating,
          title: eachJob.title,
        })),
      }

      this.setState({job: updatedData, apiStatus: apiStatusConstant.success})
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderJobDetailsView = () => {
    const {job} = this.state
    const {jobDetails, similarJobs} = job
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employementType,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      jobDescription,
    } = jobDetails
    const {title} = similarJobs[0]

    return (
      <>
        <div className="job-details-container">
          <div className="logo-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="employement-type-rating-container">
              <h1 className="employement-type">{title}</h1>
              <div className="rating-container">
                <FaStar />
                {rating}
              </div>
            </div>
          </div>
          <div className="location-lpa-container">
            <div className="location-employement-type-container">
              <div className="location-container">
                <GrLocation />
                {location}
              </div>
              <div className="employement-type-container">
                <RiSuitcaseLine />
                {employementType}
              </div>
            </div>
            <div className="lpa-container">
              <p className="lpa">{packagePerAnnum}</p>
            </div>
          </div>
          <hr />
          <div className="description-heading-link-container">
            <h1 className="description-text">Description</h1>
            <a href={companyWebsiteUrl} target="_blank" rel="noreferrer">
              Visit
            </a>
          </div>
          <p className="description">{jobDescription}</p>
          <div className="skills-container">
            <h1 className="skills-heading">Skills</h1>
            <ul className="skills-list">
              {skills.map(eachSkill => (
                <li key={eachSkill.name} className="skill">
                  <div className="skill-container">
                    <img
                      src={eachSkill.imageUrl}
                      alt={`${eachSkill.name}`}
                      className="skill-image"
                    />
                    <p className="skill-name">{eachSkill.name}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="life-at-company-container">
            <h1 className="life-at-company-heading">Life at Company </h1>
            <p className="life-at-company-description">
              {lifeAtCompany.description}
            </p>
            <div className="life-at-company-image-container">
              <img
                src={lifeAtCompany.imageUrl}
                className="life-at-company-image"
                alt="life at company"
              />
            </div>
          </div>
        </div>
        <ul className="similar-jobs-container">
          {similarJobs.map(eachSimilarJob => (
            <SimilarJobItem
              similarJobDetails={eachSimilarJob}
              key={eachSimilarJob.id}
            />
          ))}
        </ul>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onRetry = () => {
    this.getJobDetails()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failure-image"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="retry-btn" type="button" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  renderAllDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.inProgress:
        return this.renderLoadingView()
      case apiStatusConstant.success:
        return this.renderJobDetailsView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderAllDetails()}
      </>
    )
  }
}

export default JobDetailedView
