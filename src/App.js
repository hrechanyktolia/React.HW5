import './App.css';
import React from "react";
import Spoiler from "./components/Spoiler";
import RangeInput from "./components/RangeInput";
import PasswordConfirm from "./components/PasswordConfirm";
import {Timer} from "./components/Timer";
import {TimerControl} from "./components/Timer";
import {TimerAll} from "./components/Timer";
import {TimerContainer} from "./components/Timer";
import {WatchContainer} from "./components/Timer";


function App() {
  return (
    <div className="App">
        <Spoiler header={<h1>Title</h1>} open>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
            </p>
        </Spoiler>
        <Spoiler>
            <h2>Content</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
            </p>
        </Spoiler>
        <RangeInput min={2} max={10} />
        <PasswordConfirm min={2}/>
        <Timer seconds={5000} />
        <TimerControl  />
        <TimerContainer
            hours={0}
            minutes={0}
            seconds={0}
            refresh={1000}
            render={TimerAll}
        />
        <WatchContainer date={new Date()} />
    </div>
  );
}

export default App;
