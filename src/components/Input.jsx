import PropTypes from "prop-types";

function Input({ label, name, value, setValue, ...props }) {
  return (
    <div className="mb-3">
      {label && (
        <label htmlFor="exampleInputEmail1" className="form-label">
          {label}
        </label>
      )}
      <input className="form-control" id={name} value={value} onChange={(e)=>setValue(e.target.value)} {...props } />
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value:PropTypes.any,
  setValue:PropTypes.func
};

export default Input;
