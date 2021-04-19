export const dataRow = (icon, text, val, mu = "") => {
    return (
      <div className="dataRow">
        <div className="data">
          {icon} {text}
        </div>
        {val}{mu}
      </div>
    )
  }