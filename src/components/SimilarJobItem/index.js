import {FaStar} from 'react-icons/fa'
import {RiSuitcaseLine} from 'react-icons/ri'
import {GrLocation} from 'react-icons/gr'

const SimilarJobItem = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employementType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails

  return (
    <li className="similar-job-item">
      <div className="logo-title-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-job-image"
        />
        <div className="title-rating-container">
          <h1 className="similar-job-title">{title}</h1>
          <div className="rating-container">
            <FaStar />
            {rating}
          </div>
        </div>
      </div>
      <h1 className="similar-job-description-text">Description</h1>
      <p className="similar-job-description">{jobDescription}</p>
      <div className="location-job-type-container">
        <div className="location-container">
          <GrLocation />
          {location}
        </div>
        <div className="job-type-container">
          <RiSuitcaseLine />
          {employementType}
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
