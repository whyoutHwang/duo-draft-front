import { makeAutoObservable } from "mobx";

class AuthStore {
  user = null;
  isLoggedIn = false;

  constructor() {
    makeAutoObservable(this);
    this.loadFromSessionStorage();
  }

  setUser(user) {
    this.user = user;
    this.isLoggedIn = true;
    this.saveToSessionStorage();
  }

  logout() {
    this.user = null;
    this.isLoggedIn = false;
  }

  saveToSessionStorage() {
    sessionStorage.setItem(
      "AuthStore",
      JSON.stringify({
        isLoggedIn: this.isLoggedIn,
        user: this.user,
      })
    );
  }

  loadFromSessionStorage() {
    const storedData = sessionStorage.getItem("AuthStore");

    if (storedData) {
      const { isLoggedIn, user } = JSON.parse(storedData);
      console.log(isLoggedIn, user);
      this.isLoggedIn = isLoggedIn;
      this.user = user;
    }
  }
}

export default new AuthStore();
