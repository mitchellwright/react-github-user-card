import React from "react";
import axios from "axios";
import ProfileCard from "./components/ProfileCard";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      mainUser: {},
      followers: [],
    };
  }

  componentDidMount() {
    console.log("CDM");
    axios
      .get("https://api.github.com/users/mitchellwright")
      .then((res) => {
        this.setState({ mainUser: res.data });
      })
      .catch((err) => console.error(err));
  }

  componentDidUpdate() {
    console.log("CDU");
  }

  render() {
    return (
      <div className="relative bg-gray-50 mt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ProfileCard
              avatar={this.state.mainUser.avatar_url}
              bio={this.state.mainUser.bio}
              company={this.state.mainUser.company}
              username={this.state.mainUser.login}
            />
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
