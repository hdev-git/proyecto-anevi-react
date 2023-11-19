import React, { Component, createContext } from "react";
import { getUser, setUser } from "./../utils/localuser";
export const UserContext = createContext();

export class UserProvider extends Component {
  state = {
    user: {
      id: 0,
      role: "",
      token: "",
    },
  };

  componentDidMount = () => {
    let { user } = this.state;
    if (user.token === "") {
      let luser = getUser();
      if (luser) {
        this.setState({
          user: {
            id: luser.user.id,
            role: luser.user.role,
            token: luser.token,
          },
        });
      }
    }
  };

  setUser = async (user) => {
    await setUser(user);
    this.setState({ user });
  };

  clearUser = () => {
    setUser({
      id: 0,
      role: "",
      token: "",
    });
    this.setState({ user: getUser() });
    localStorage.clear();
  };

  render() {
    const { user } = this.state;
    return (
      <UserContext.Provider
        value={{ user, setUser: this.setUser, clearUser: this.clearUser }}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
