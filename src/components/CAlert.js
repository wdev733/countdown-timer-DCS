import React from "react";
import PropTypes from "prop-types";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const CAlert = ({ type, message, open, onClose, position, duration }) => (
  <Snackbar
    open={open}
    autoHideDuration={duration}
    onClose={onClose}
    anchorOrigin={{ ...position }}
  >
    <Alert onClose={onClose} severity={type}>
      {message}
    </Alert>
  </Snackbar>
);

CAlert.defaultProps = {
  type: "success",
  duration: 3000,
  position: { vertical: "top", horizontal: "center" },
};

CAlert.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  duration: PropTypes.number,
  position: PropTypes.shape({
    vertical: PropTypes.string,
    horizontal: PropTypes.string,
  }),
};

export default CAlert;
