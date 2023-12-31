import PropTypes from "prop-types";
import { useField } from "formik";

function MyTextInput({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="mb-3">
      <label htmlFor={props.id || props.name} className="form-label">
        {label}
      </label>
      <input className="form-control" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="text-danger">{meta.error}</div>
      ) : null}
    </div>
  );
}

export default MyTextInput;

MyTextInput.propTypes = {
  label: PropTypes.string.isRequired,
  props: PropTypes.object.isRequired,
  id: PropTypes.string,
  name: PropTypes.string,
};
