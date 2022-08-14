import React, { useState, useEffect } from "react";
import clock_s from "../image/ClockFace_S.png";
import clock_m from "../image/ClockFace_M.png";
import clock_h from "../image/ClockFace_H.png";

export class Timer extends React.Component {
    state = {
        seconds: this.props.seconds,
        minutes: 0,
        hour: 0,
    };
    componentWillMount() {
        this.state.seconds = this.props.seconds % 60;
        this.state.minutes = Math.floor(this.props.seconds / 60);
        this.state.hour = Math.floor(this.state.minutes / 60);
        this.state.minutes = Math.floor(this.state.minutes % 60);
    }

    timer = () => {
        const {seconds, minutes, hour} = this.state;
        if (seconds > 0) {
            this.setState(({ seconds }) => ({
                seconds: seconds - 1,
            }));
        }
        if (seconds === 0) {
            if (minutes === 0) {
                if (hour === 0) {
                    clearInterval(this.timer);
                } else {
                    this.setState(({hour}) => ({
                        hour: hour - 1,
                        minutes: 59,
                        seconds: 59,
                    }));
                }
            } else {
                this.setState(({minutes, hour}) => ({
                    hour: hour,
                    minutes: minutes - 1,
                    seconds: 59,
                }));
            }
        }
    };
    stopInterval = () => {
        clearInterval(this.time);
        this.setState({ timerStatus: false });
    };

    startInterval = () => {
        this.time = setInterval(this.timer, 1000);
        this.setState({ timerStatus: true });
    };

    render() {
        return (
            <div className="timer">
                <h1 className="title">Timer</h1>
                <p className="header">
                    {this.state.hour}:{this.state.minutes}:{this.state.seconds}
                </p>

                <button
                    className="timer-button"
                    onClick={
                        !this.state.timerStatus ? this.startInterval : this.stopInterval
                    }
                >
                    {this.state.timerStatus ? "Stop" : "Start"}
                </button>
            </div>
        );
    }
}

 export const TimerControl = ({seconds, minute, hours}) => {
    let [Seconds, setSeconds] = useState(seconds);
    let [Minute, setMinute] = useState(minute);
    let [Hours, setHours] = useState(hours);
    let [TimeInSeconds, setTimeInSeconds] = useState(0);
    const handleChangeSeconds = (e) => {
        let seconds = e.target.value;
        setSeconds((Seconds = seconds));
    };
    const handleChangeMinute = (e) => {
        let minute = e.target.value;
        setMinute((Minute = minute));
    };
    const handleChangeHours = (e) => {
        let hours = e.target.value;
        setHours((Hours = hours));
    };
    const onClick = () => {
        setTimeInSeconds((TimeInSeconds = 0));
        setTimeInSeconds(
            (TimeInSeconds =
                Number(Seconds) + Number(Minute * 60) + Number(Hours * 3600))
        );
        console.log(TimeInSeconds);
    };
    return (
        <div className="timer-control">
            <p className="title">Timer Control</p>
            <div>
                <p className="header">Seconds</p>
                <input
                    className="input"
                    type="number"
                    min="0"
                    max="60"
                    onChange={handleChangeSeconds}
                />
            </div>
            <div>
                <p className="header">Minute</p>
                <input
                    className="input"
                    type="number"
                    min="0"
                    max="60"
                    onChange={handleChangeMinute}
                />
            </div>
            <div>
                <p className="header">Hours</p>{" "}
                <input
                    className="input"
                    type="number"
                    min="0"
                    onChange={handleChangeHours}
                />
            </div>
            <button className="timer-control-button" onClick={onClick}>
                Start
            </button>
            {TimeInSeconds > 0 ? <Timer seconds={TimeInSeconds} /> : ""}
        </div>
    );
};

 export const TimerContainer = ({hours, minutes, seconds, refresh, render}) => {
    let [Hours, setHours] = useState(hours);
    let [Minutes, setMinutes] = useState(minutes);
    let [Seconds, setSeconds] = useState(seconds);
    const [timerStatus, SetTimerStatus] = useState(false);

    const RenderField = render;

    const handleChangeHours = (e) => {
        let hours = e.target.value;
        setHours((Hours = hours));
    };
    const handleChangeMinutes = (e) => {
        let minute = e.target.value;
        setMinutes((Minutes = minute));
    };
    const handleChangeSeconds = (e) => {
        let seconds = e.target.value;
        setSeconds((Seconds = seconds));
    };
    const TimeButton = () =>
        SetTimerStatus((timerStatus) => {
            return !timerStatus;
        });

    useEffect(() => {
        let interval = null;
        if (timerStatus) {
            interval = setInterval(() => {
                setSeconds((seconds) => {
                    if (seconds > 0) setSeconds(seconds - 1);
                    else if (seconds === 0) {
                        setMinutes((minutes) => {
                            if (minutes > 0) {
                                setMinutes(minutes - 1);
                                setSeconds((seconds = 59));
                            }
                            if (minutes === 0 && seconds === 0) {
                                if (Hours > 0) {
                                    setHours(Hours - 1);
                                    setMinutes((minutes = 59));
                                    setSeconds((seconds = 59));
                                } else if (Hours === 0) {
                                    setHours((hours) => {
                                        if (hours === 0 && minutes === 0 && seconds === 0) {
                                            clearInterval(interval);
                                            return hours;
                                        }
                                        setMinutes((minutes = 59));
                                        setSeconds((seconds = 59));
                                    });
                                }
                                return minutes;
                            }
                        });
                    }
                    return seconds;
                });
            }, refresh);
        } else if (!timerStatus && Seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timerStatus, Seconds, refresh]);

    return (
        <RenderField
            seconds={Seconds}
            minutes={Minutes}
            hours={Hours}
            handleChangeHours={handleChangeHours}
            handleChangeMinutes={handleChangeMinutes}
            handleChangeSeconds={handleChangeSeconds}
            TimeButton={TimeButton}
            timerStatus={timerStatus}
        />
    );
};

 export function TimerAll({
                      seconds,
                      minutes,
                      hours,
                      handleChangeHours,
                      handleChangeMinutes,
                      handleChangeSeconds,
                      TimeButton,
                      timerStatus,
                  }) {
    return (
        <>
            <div className="timer-container">
                <h2 className="title">Timer</h2>
                <p className="header">
                    {hours}:{minutes}:{seconds}
                </p>
                <div>
                    <p className="header">Hours</p>
                    <input
                        className="input"
                        type="number"
                        min="0"
                        max="24"
                        placeholder="Hours"
                        onChange={handleChangeHours}
                    />
                    <p className="header">Minutes</p>
                    <input
                        className="input"
                        type="number"
                        min="0"
                        max="59"
                        placeholder="Minutes"
                        onChange={handleChangeMinutes}
                    />
                    <p className="header">Seconds</p>
                    <input
                        className="input"
                        type="number"
                        min="0"
                        max="59"
                        placeholder="Seconds"
                        onChange={handleChangeSeconds}
                    />
                </div>
                <button className="timer-container-button" onClick={TimeButton}>
                    {timerStatus ? "Stop" : "Start"}
                </button>
            </div>
        </>
    );
}

 export class WatchContainer extends React.Component {
    state = {
        seconds: this.props.date.getSeconds(),
        minutes: this.props.date.getMinutes(),
        hours: this.props.date.getHours(),
        secondLine: {},
        minuteLine: {},
        hourLine: {},
    };

    componentWillMount() {
        this.time = setInterval(this.timer, 1000);
        this.setState({ timerStatus: true });
    }

    componentDidUpdate() {
        this.secondLine = {
            transform: "rotate(" + (this.state.seconds / 60) * 360 + "deg)",
        };

        this.minuteLine = {
            transform: `rotate(${
                (this.state.minutes / 60) * 360 + (this.state.seconds / 60) * 6
            }deg)`,
        };

        this.hourLine = {
            transform: `rotate(${
                (this.state.hours / 12) * 360 + (this.state.minutes / 60) * 30
            }deg)`,
        };
    }

    timer = () => {
        console.log(this.state);
        const { seconds, minutes, hours } = this.state;
        this.setState(({ seconds }) => ({
            seconds: seconds + 1,
        }));

        if (seconds === 60) {
            this.setState(({ minutes }) => ({
                minutes: minutes + 1,
                seconds: 1,
            }));
        }
        if (minutes === 60) {
            this.setState(({ hours }) => ({
                hours: hours + 1,
                minutes: 0,
            }));
        }
        if (hours === 24) {
            this.setState(() => ({
                hour: 0,
            }));
        }
    };

    render() {
        return (
            <div className="watch-container">
                <div className="watch">
                    <img
                        src={clock_s}
                        style={this.secondLine}
                        className="line second-line"
                    />
                    <img
                        src={clock_m}
                        style={this.minuteLine}
                        className="line minute-line"
                    />
                    <img src={clock_h} style={this.hourLine} className="line hour-line" />
                </div>
            </div>
        );
    }
}

