import React from "react";
import PropTypes from "prop-types";
import "../styles/auth.css";

export default function Popup({ show, message, onClose, type = "error" }) {
  if (!show) return null;
  return (
    <div className="popup-overlay">
      <div className={`popup-card popup-${type}`}>
        <div className="popup-message">{message}</div>
        <button className="popup-close-btn" onClick={onClose}>OK</button>
      </div>
    </div>
  );
}

Popup.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["error", "info", "success"]),
};
