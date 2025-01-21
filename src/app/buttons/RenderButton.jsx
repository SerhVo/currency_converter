import "react";
import PropTypes from "prop-types";

const RenderButton = ({ currencyId, label, onClickHandler, isActive }) => {
  return (
    <button
      key={currencyId}
      onClick={onClickHandler}
      className={isActive ? "active" : ""}
    >
      {label}
    </button>
  );
};

RenderButton.propTypes = {
  currencyId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default RenderButton;
