import PropTypes from "prop-types";
import { useField } from "formik";

function MyTextInput({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="form-floating my-3">
      <input
        className="form-control"
        {...field}
        {...props}
        autoComplete="on"
        id={props.id || props.name}
      />
      <label htmlFor={props.id || props.name} className="form-label">
        {label}
      </label>
      {meta.touched && meta.error ? (
        <div className="text-danger">{meta.error}</div>
      ) : null}
    </div>
  );
}

export default MyTextInput;

MyTextInput.propTypes = {
  label: PropTypes.string,
  props: PropTypes.object,
  id: PropTypes.string,
  name: PropTypes.string,
};
