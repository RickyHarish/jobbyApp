import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import JobItem from '../JobItem'
// import FiltersGroup from '../FiltersGroup'
import EmployementType from '../EmployementType'
import SalaryRange from '../SalaryRange'
// import {async} from 'fast-glob'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class AllJobsSection extends Component {
  state = {
    jobsList: {},
    employementType: [],
    apiProfileStatus: apiStatusConstants.initial,
    profileData: {},
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobs()
    this.getProfile()
  }

  getJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {employementType, minimumPackage, searchInput} = this.state

    const employementTypeString = employementType.join(',')

    console.log(employementTypeString)

    const url = `https://apis.ccbp.in/jobs?employment_type=${employementTypeString}&minimum_package=${minimumPackage}&search=${searchInput}`

    const jwtToken = Cookies.get('jwt_token')
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
        jobs: data.jobs.map(eachJob => ({
          companyLogoUrl: eachJob.company_log_url,
          employementType: eachJob.employement_type,
          id: eachJob.id,
          jobDescription: eachJob.job_description,
          location: eachJob.location,
          packagePerAnnum: eachJob.package_per_annum,
          rating: eachJob.rating,
          title: eachJob.title,
        })),
        total: data.total,
      }
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderNoJobsView = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        className="no-jobs-image"
        alt="no jobs"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  renderJobItems = () => {
    const {jobsList} = this.state
    const {jobs} = jobsList
    const isJobsLoaded = jobs.length > 0
    return (
      <>
        {isJobsLoaded ? (
          <div className="jobs-container">
            <ul className="jobs-list">
              {jobs.map(eachJob => (
                <JobItem jobDetails={eachJob} key={eachJob.id} />
              ))}
            </ul>
          </div>
        ) : (
          this.renderNoJobsView()
        )}
      </>
    )
  }

  /* changeFullTimeJob = fullTime => {
    this.setState({fullTime}, this.getJobs)
  }

  changePartTime = partTime => {
    this.setState({partTime}, this.getJobs)
  }

  changeInternship = internship => {
    this.setState({internship}, this.getJobs)
  }

  changeFreelance = freelance => {
    this.setState({freelance}, this.getJobs)
  }  */

  changeEmployementType = employementTypeId => {
    const {employementType} = this.state
    if (employementType.includes(employementTypeId) === true) {
      this.setState(
        {
          employementType: employementType.filter(
            eachItem => eachItem !== employementTypeId,
          ),
        },
        this.getJobs,
      )
    } else {
      this.setState(
        {
          employementType: [...employementType, employementTypeId],
        },
        this.getJobs,
      )
    }
  }

  changeMinimumPackage = salaryRangeId => {
    this.setState({minimumPackage: salaryRangeId}, this.getJobs)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onReloadJobsList = () => {
    this.getJobs()
  }

  onClickSearch = () => {
    this.getJobs()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failure-image"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-des">
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="retry-button"
        onClick={this.onReloadJobsList}
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderEmployementType = () => (
    <div className="employement-type-container">
      <h1 className="employement-heading">Type of Employement</h1>
      <ul className="employement-list">
        {employmentTypesList.map(eachType => (
          <EmployementType
            key={eachType.employmentTypeId}
            employement={eachType}
            changeEmployementType={this.changeEmployementType}
          />
        ))}
      </ul>
    </div>
  )

  renderSalaryRange = () => (
    <div className="salary-ranges-container">
      <h1 className="salary-ranges-heading">Salary Range</h1>
      <ul className="salary-range-list">
        {salaryRangesList.map(eachSalary => (
          <SalaryRange
            salaryDetails={eachSalary}
            key={eachSalary.salaryRangeId}
            changeMinimumPackage={this.changeMinimumPackage}
          />
        ))}
      </ul>
    </div>
  )

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="search-container">
        <input
          type="search"
          value={searchInput}
          className="search-input"
          onChange={this.onChangeSearchInput}
          placeholder="Search"
        />
        <button
          className="search-button"
          type="button"
          onClick={this.onClickSearch}
        >
          <BsSearch fill="white" />
        </button>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" height="50" width="80" color="#ffffff" />
    </div>
  )

  renderAllJobsView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItems()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  getProfile = async () => {
    this.setState({apiProfileStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const profileData = await response.json()

      const updatedProfileData = {
        profileDetails: {
          name: profileData.profile_details.name,
          profileImageUrl: profileData.profile_details.profile_image_url,
          shortBio: profileData.profile_details.short_bio,
        },
      }
      this.setState({
        profileData: updatedProfileData,
        apiProfileStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiProfileStatus: apiStatusConstants.failure})
    }
  }

  reloadProfile = () => {
    this.getProfile()
  }

  renderProfileFailure = () => (
    <button
      type="button"
      className="failure-profile-button"
      onClick={this.reloadProfile}
    >
      Retry
    </button>
  )

  renderUserProfile = () => {
    const {profileData} = this.state
    const {profileDetails} = profileData
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="user-profile-container">
        <img src={profileImageUrl} alt="profile" className="profile-image" />
        <h1 className="profile-user-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderUserProfileCard = () => {
    const {apiProfileStatus} = this.state
    switch (apiProfileStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderUserProfile()
      case apiStatusConstants.failure:
        return this.renderProfileFailure()
      default:
        return null
    }
  }

  renderUi = () => (
    <>
      {this.renderSearchInput()}
      {this.renderUserProfileCard()}
      {this.renderEmployementType()}
      {this.renderSalaryRange()}
      {this.renderAllJobsView()}
    </>
  )

  render() {
    return <div className="bg-container">{this.renderUi()}</div>
  }
}

export default AllJobsSection
