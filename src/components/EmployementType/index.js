const EmployementType = props => {
  const {employement, changeEmployementType} = props
  const {label, employementTypeId} = employement

  const onChangeEmployementId = () => {
    changeEmployementType(employementTypeId)
  }

  return (
    <li className="employement-item">
      <input
        type="checkbox"
        id={employementTypeId}
        className="checkbox-el"
        onClick={onChangeEmployementId}
      />
      <label htmlFor={employementTypeId} className="employement-label">
        {label}
      </label>
    </li>
  )
}

export default EmployementType
