/* eslint-disable no-useless-constructor */
import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';

const BUTTON_ARANGEMENT = [
  ["Q", "Heater-1", "Heater 1"],
  ["W", "Heater-2", "Heater 2"],
  ["E", "Heater-3", "Heater 3"],
  ["A", "Heater-4_1", "Heater 4"],
  ["S", "Heater-6", "Heater 6"],
  ["D", "Dsc_Oh", "Wait where did heater 5 go"],
  ["Z", "Kick_n_Hat", "Heater 11"],
  ["X", "RP4_KICK_1", "These arent even heaters anymore"],
  ["C", "Cev_H2", "What even is a heater anyways"]
];

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      mostRecentPlay: ""
    }
  }

  setDisplay = (text) => {
    return(
      this.setState({
        mostRecentPlay: text
      }));
  }

  render(){
    const drumButtons = BUTTON_ARANGEMENT.map(elem => <DrumButton key={elem[0]} audioKey={elem[0]} audioName={elem[1]} setDisplay={this.setDisplay} displayString={elem[2]} />);
    return (
      <div id="drum-machine">
        <div id="keypad">
          {drumButtons}
        </div>
        <div id="display-panel">
          <Display displayString={this.state.mostRecentPlay} />
        </div>
      </div>
    );
  }
}

function Display({displayString}) {
  return <p id="display">{displayString}</p>;
}

class DrumButton extends Component {
  constructor(props){
    super(props);
  }

  TogglePlaying = (event) => {
    var audio = document.getElementById(this.props.audioKey);
    this.props.setDisplay(this.props.displayString)
    if (audio.paused) {
        audio.play();
    }else{
        audio.currentTime = 0
    }
    return;
  }

  render(){
    return (
      <button className="drum-pad" id={this.props.audioName} onClick={this.TogglePlaying} >
        {/**onKeyDown={this.TogglePlaying} */}
        {this.props.audioKey}
        <audio className="clip" id={this.props.audioKey} src={"https://s3.amazonaws.com/freecodecamp/drums/" + this.props.audioName + ".mp3"} />
      </button>
    );
  }
};

window.addEventListener("keydown", (event) => {
  if (event.defaultPrevented || event.repeat) {
    return; // Do nothing if the event was already processed
  }

  //console.log(event.key.toUpperCase());

  var audio = document.getElementById(event.key.toUpperCase());
  
  if (audio !== null){
    //dont know how to check if its a specifically audio element, could also just use a switch for valid keys 
    if( audio.paused) {
      audio.play();
    }else{
        audio.currentTime = 0
    }
  }

  return;
}, true);


export default App;
