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

  componentDidUpdate(prevProps, prevState) {
    console.log("CDU");
    if (prevState.mainUser !== this.state.mainUser) {
      console.log("get followers now!");
      axios
        .get(this.state.mainUser.followers_url)
        .then((res) => {
          Promise.all(
            res.data.map((follower) => {
              console.log(follower.url);
              return axios.get(follower.url);
            })
          )
            .then((res) => {
              this.setState({
                followers: [...res.map((follower) => follower.data)],
              });
              console.log(this.state.followers);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    axios
      .get(`https://api.github.com/users/${e.target.username.value}`)
      .then((res) => {
        this.setState({ mainUser: res.data });
      })
      .catch((err) => console.error(err));
  };

  render() {
    return (
      <div className="relative mt-8">
        <div className="m-8 sm:w-full xl:mt-0 xl:ml-8 flex justify-center content-center">
          <form
            onSubmit={this.handleSubmit}
            className="sm:flex"
            aria-labelledby="newsletter-headline"
          >
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                http://github.com/
              </span>
              <input
                id="username"
                name="username"
                className="form-input flex-1 block w-full px-3 py-2 rounded-none rounded-r-md sm:text-sm sm:leading-5"
                placeholder="mitchellwright"
              />
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
              <button className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none focus:bg-indigo-400 transition duration-150 ease-in-out">
                Find User
              </button>
            </div>
          </form>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ProfileCard
              avatar={this.state.mainUser.avatar_url}
              bio={this.state.mainUser.bio}
              company={this.state.mainUser.company}
              username={this.state.mainUser.login}
            />
            {this.state.followers.map((follower) => {
              return (
                <ProfileCard
                  avatar={follower.avatar_url}
                  bio={follower.bio}
                  company={follower.company}
                  username={follower.login}
                  key={follower.id}
                />
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
