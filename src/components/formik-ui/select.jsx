import PropTypes from "prop-types";
import { useField } from "formik";

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="form-floating my-3">
      <select
        className="form-select"
        {...field}
        {...props}
        id={props.id || props.name}
      />
      <label htmlFor={props.id || props.name}>{label}</label>
      {meta.touched && meta.error ? (
        <div className="text-danger">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MySelect;

MySelect.propTypes = {
  label: PropTypes.string,
  props: PropTypes.object,
  id: PropTypes.string,
  name: PropTypes.string,
};
