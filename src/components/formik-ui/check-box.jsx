import PropTypes from "prop-types";
import { useField } from "formik";

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <div className="mb-3">
      <label className="checkbox-input">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="text-danger">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MyCheckbox;

MyCheckbox.propTypes = {
  children: PropTypes.node.isRequired,
  props: PropTypes.object.isRequired,
};
