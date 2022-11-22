// Select component.
export function Select({ values, onChange }) {
  return (
    <div className="control">
      <div className="control-icon">
        <i className="material-icons">&#xE152;</i>
      </div>
      <div className="select-arrow">
        <i className="material-icons">&#xE313;</i>
      </div>
      <select
        className="control-field filter-field form-control"
        onChange={onChange}
        defaultValue={values[0]}
      >
        {values.map((value, i) => (
          <option key={i} value={value.toLowerCase()}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}

// Input component.
export function Input({ onKeyUp }) {
  return (
    <div className="control">
      <div className="control-icon">
        <i className="material-icons">&#xE8B6;</i>
      </div>
      <input
        className="control-field search-field form-control"
        onKeyUp={onKeyUp}
        type="text"
        placeholder="Search..."
      />
    </div>
  );
}

// Button component.
export function Button({ onClick }) {
  return (
    <button className="add-more-items btn btn-primary" onClick={onClick}>
      <i className="material-icons">&#xE145;</i>
      Add more items
    </button>
  );
}

// Header component.
export function Header({ children }) {
  return (
    <>
      <h2 className="section-title">
        <span>Grid demo</span>
      </h2>
      <div className="controls cf">{children}</div>
    </>
  );
}

// Footer component.
export function Footer({ children }) {
  return <div className="grid-footer">{children}</div>;
}

// Demo component.
export function Demo({ children }) {
  return <section className="grid-demo">{children}</section>;
}
