import {Link} from 'react-router-dom'

import {FaStar} from 'react-icons/fa'
// import {PiSuitcaseSimpleBold} from 'react-icons/pi'
// import {FaLocationDot} from 'react-icons/fa'
import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employementType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`}>
      <div className="job-item-card">
        <div className="card-upside">
          <div className="company-logo-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
            <div className="job-role-container">
              <p className="job-role">{title}</p>
              <div className="rating-container">
                <FaStar />
                {rating}
              </div>
            </div>
          </div>
          <div className="location-lpa-container">
            <div className="location-job-type-container">
              <div className="location-container">{location}</div>
              <div className="job-type-container">{employementType}</div>
            </div>
            <div className="lpa-container">{packagePerAnnum}</div>
          </div>
        </div>
        <div className="card-down-side">
          <h1 className="description-heading">Description</h1>
          <p className="description">{jobDescription}</p>
        </div>
      </div>
    </Link>
  )
}

export default JobItem
