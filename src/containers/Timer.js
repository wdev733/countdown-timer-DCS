import React, { useState, useEffect, useRef } from "react";
// import PropTypes from "prop-types";
import {
  Typography,
  Box,
  TextField,
  Button,
  makeStyles,
} from "@material-ui/core";

import CountDown from "../components/CountDown";
import CAlert from "../components/CAlert";

import { isInt } from "../utils/numberFormat";

const INTERVAL = 1000;
var intervalTimer = null;

const Timer = () => {
  const classes = useStyles();
  const textRef = useRef();

  // Alert Parameters
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [running, setRunning] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [leftTime, setLeftTime] = useState(0);
  const [noticeText, setNoticeText] = useState("");
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    if (totalTime > 0) {
      if (leftTime <= totalTime / 2) {
        setNoticeText("More than halfway there!");
      } else if (leftTime <= 0) {
        setNoticeText("Time’s up!");
      } else {
        setNoticeText("");
      }
    }
  }, [totalTime, leftTime]);

  useEffect(() => {
    if (totalTime > 0) {
      setLeftTime(totalTime);
      setRunning(true);

      startTimer();
    }
  }, [totalTime]);

  useEffect(() => {
    if (running) {
      startTimer();
    }
  }, [speed]);

  useEffect(() => {
    if (leftTime <= 0) {
      endTimer();
      setTotalTime(0);
    }
  }, [leftTime]);

  useEffect(() => {
    if (running) {
      startTimer();
    } else {
      endTimer();
    }
  }, [running]);

  const startTimer = () => {

    endTimer();

    intervalTimer = setInterval(() => {
      setLeftTime((leftTime) => leftTime > INTERVAL ? leftTime - INTERVAL : 0);
    }, INTERVAL / speed);
  };

  const endTimer = () => {
    if (intervalTimer !== null) {
      clearInterval(intervalTimer);
    }
  };

  const handleChangeSpeed = (s) => {
    setSpeed(s);
  };

  const handleSetTime = () => {
    const minutes = textRef.current.value;
    if (!isInt(minutes)) {
      setAlertOpen(true);
      setAlertMessage("The value must be a number");
      return;
    }

    if (Number(minutes) <= 0) {
      setAlertOpen(true);
      setAlertMessage("The value must be greater than 0");
      return;
    }

    setTotalTime(minutes * 60 * INTERVAL);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleChangeRunningStatus = () => {
    setRunning((running) => !running);
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.timerControllerWrapper}>
        <Typography
          variant="button"
          style={{ fontSize: "1rem", textTransform: "none" }}
        >
          Count down:
        </Typography>
        <TextField
          placeholder="(Min)"
          variant="outlined"
          size="small"
          className={classes.timerDuration}
          inputRef={textRef}
        />
        <Button variant="contained" color="primary" onClick={handleSetTime}>
          Start
        </Button>
      </Box>
      <Box>
        <CountDown
          notice={noticeText}
          leftTime={leftTime}
          running={running}
          onChangeRunningStatus={handleChangeRunningStatus}
        />
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button
          variant="contained"
          color={speed === 1 ? "secondary" : "default"}
          className={classes.ctrlBtn}
          onClick={(e) => handleChangeSpeed(1, e)}
        >
          1X
        </Button>
        <Button
          variant="contained"
          color={speed === 1.5 ? "secondary" : "default"}
          className={classes.ctrlBtn}
          onClick={(e) => handleChangeSpeed(1.5, e)}
        >
          1.5X
        </Button>
        <Button
          variant="contained"
          color={speed === 2 ? "secondary" : "default"}
          className={classes.ctrlBtn}
          onClick={(e) => handleChangeSpeed(2, e)}
        >
          2X
        </Button>
      </Box>
      <CAlert
        type="error"
        message={alertMessage}
        open={alertOpen}
        onClose={handleCloseAlert}
      />
    </Box>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 56,
  },
  timerControllerWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  timerDuration: {
    width: 130,
    marginLeft: 10,
    marginRight: 10,
  },
  ctrlBtn: {
    marginLeft: 5,
    marginRight: 5,
  },
}));

export default Timer;
