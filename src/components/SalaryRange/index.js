const SalaryRange = props => {
  const {salaryDetails, changeMinimumPackage} = props
  const {salaryRangeId, label} = salaryDetails

  const onChangeSalary = () => {
    changeMinimumPackage(salaryRangeId)
  }

  return (
    <li className="salary-item">
      <input
        className="salary-input"
        type="radio"
        name="salary range"
        id={salaryRangeId}
        onChange={onChangeSalary}
      />
      <label className="salary-label" htmlFor={salaryRangeId}>
        {label}
      </label>
    </li>
  )
}

export default SalaryRange
