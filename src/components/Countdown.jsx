import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import PassDialog from './PassDialog';

// MUI

function Countdown(props) {
  const { users } = props;

  const Ref = useRef(null);

  const [timer, setTimer] = useState('24:00:00');
  const [openPass, setOpenPass] = useState(false);

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    const {
      total, hours, minutes, seconds,
    } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        `${hours > 9 ? hours : `0${hours}`
        }:${minutes > 9 ? minutes : `0${minutes}`
        }:${seconds > 9 ? seconds : `0${seconds}`}`,
      );
    }
  };

  const clearTimer = (e) => {
    setTimer('24:00:00');
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 86400);
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  const onClickReset = () => {
    clearTimer(getDeadTime());
  };

  const messageHandler = () => {
    setOpenPass(false);
    onClickReset();
  };

  return (
    <div className="App">
      {/* <p>Lista válida por {timer}</p> */}
      <Button
        variant="contained"
        color="success"
        onClick={() => setOpenPass(true)}
      >
        Enviar pedido a Hugo
      </Button>
      <br />
      <br />
      <PassDialog
        open={openPass}
        users={users}
        onClose={messageHandler}
      />
    </div>
  );
}

export default Countdown;
