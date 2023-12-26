import PropTypes from "prop-types";
import { useField } from "formik";

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select className="form-select" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="text-danger">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MySelect;

MySelect.propTypes = {
  label: PropTypes.string.isRequired,
  props: PropTypes.object.isRequired,
  id: PropTypes.string,
  name: PropTypes.string,
};
