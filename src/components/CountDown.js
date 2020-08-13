import React from "react";
import PropTypes from "prop-types";

import { Typography, Box, makeStyles } from "@material-ui/core";
import PauseCircleOutlineOutlinedIcon from "@material-ui/icons/PauseCircleOutlineOutlined";
import PlayCircleOutlineOutlinedIcon from "@material-ui/icons/PlayCircleOutlineOutlined";

import { milliSecondsToMMSS } from "../utils/dates";

import classnames from "classnames";

const CountDown = ({ notice, leftTime, running, onChangeRunningStatus }) => {
  const classes = useStyles();

  const noticeClass = classnames({
    [classes.timer]: true,
    [classes.red]: (leftTime > 0 && leftTime <= 20000) ? true : false,
    [classes.blinking]: (leftTime > 0 && leftTime < 10000) ? true: false,
  });

  return (
    <Box className={classes.root}>
      <Typography variant="h6" display="block" className={classes.notice}>
        {notice}
      </Typography>
      <Box className={classes.timerWrapper}>
        <Typography variant="h1" display="block" className={noticeClass}>
          {milliSecondsToMMSS(leftTime)}
        </Typography>
        {running ? (
          <PauseCircleOutlineOutlinedIcon
            role="button"
            className={classes.ctrlBtn}
            onClick={onChangeRunningStatus}
          />
        ) : (
          <PlayCircleOutlineOutlinedIcon
            role="button"
            className={classes.ctrlBtn}
            onClick={onChangeRunningStatus}
          />
        )}
      </Box>
    </Box>
  );
};

CountDown.defaultProps = {
  notice: "",
  leftTime: 0,
  running: false
};

CountDown.propTypes = {
  notice: PropTypes.string.isRequired,
  leftTime: PropTypes.number.isRequired,
  running: PropTypes.bool.isRequired,
  onChangeRunningStatus: PropTypes.func.isRequired,
};

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    padding: "15px 0px",
  },
  notice: {
    fontStyle: "italic",
  },
  timerWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  timer: {
    fontSize: "9rem",
    fontWeight: "700",
  },
  ctrlBtn: {
    width: 70,
    height: 70,
    marginLeft: 20,
    cursor: "pointer",
  },
  red: {
    color: "red",
  },
  blinking: {
    animationName: "$blinker",
    animationDuration: "0.5s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
  },
  "@keyframes blinker": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
}));

export default CountDown;
