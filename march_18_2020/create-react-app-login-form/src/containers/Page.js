import React, { Component } from 'react';
import LoggedOut from '../components/LoggedOut';
import LoggedIn from '../components/LoggedIn';
import { members } from '../config';

const defaultFetchOptions = {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};

class Page extends Component {
  constructor() {
    super();

    this.state = {
      userLoggedIn: false,
      errorMessage: '',
      userId: null
    }
    this.logUserIn = this.logUserIn.bind(this);
  }

  parseLogInResponse({user = {}}) {
    console.log(user);
    if (user.success === "true") {
      this.setState({
        userLoggedIn: true,
        userId: user.id
      });
    } else {
      this.setState({
        errorMessage: 'Sorry that wasnt correct'
      })
    }
  }

  logUserIn(username, password) {
    for(var i=0; i<members.people.length; i++) {
      if(members.people[i].username === username && password === members.people[i].password) { 
        console.log("success");
        this.parseLogInResponse({"user": {"success": "true", "id": username}});
        return;
      }
    }
      this.parseLogInResponse({"user": {"success": "false", "id": username}});
      return;
  }

  render() {
    return (
      <div>
        {this.state.userLoggedIn ?
          (<LoggedIn userId={this.state.userId} />) :
          (<LoggedOut errorMessage={this.state.errorMessage} logUserIn={this.logUserIn} />)
        }
      </div>
    )
  }
}

export default Page;
