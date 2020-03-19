import React, { Component } from 'react';

class LoggedIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
        blockchainOp: false,
        epoch: 0
    };
   this.handleClick = this.handleClick.bind(this);
   this.blog =  this.blog.bind(this);
  }

  blog(message = "") {
    var logger = document.getElementById('log');
    logger.innerHTML += message + '<br />';
  }
  componentDidMount() {
    console.log("hello world");
    this.timer = setInterval(
            () => this.blog("Local update(GPU) " + this.state.epoch++),
            1000,
        );
  }

  handleClick() {
    this.setState(state => ({
      blockchainOp: !state.blockchainOp
    }));
    console.log(this.state.blockchainOp);
    if(this.state.blockchainOp == false) {
      this.blog("Send update to Blockchain");
      clearInterval(this.timer);
    } else {
    this.blog("Receive update from Blockchain");
    this.timer = setInterval(
            () => this.blog("Local update(GPU) " + this.state.epoch++),
            1000,
        );
      
    }
  }

  render() {
    return (
      <div>
        Thanks for logging in {this.props.userId}
      <button title="Query BC" onClick={this.handleClick} type= "submit">Query BC
        {this.state.blockchainOp ? true : false}
      </button>
      <div id="log"></div>
      </div>
    );
  }
}

export default LoggedIn;
