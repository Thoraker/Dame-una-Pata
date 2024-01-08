import PropTypes from "prop-types";
import { useField } from "formik";

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <div className="my-3">
      <label className="checkbox-input" htmlFor={props.id || props.name}>
        <input
          type="checkbox"
          {...field}
          {...props}
          id={props.id || props.name}
        />
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
  children: PropTypes.node,
  props: PropTypes.object,
  id: PropTypes.string,
  name: PropTypes.string,
};
