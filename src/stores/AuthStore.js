import { makeAutoObservable, runInAction } from "mobx";
import { getTeacherInfo } from "../service/apiService";
import TeacherImage from "../assets/image/character/Teacher_1.png";

class AuthStore {
  user = null;
  isLoggedIn = false;
  teacherInfo = {
    name: "",
    imageUrl: TeacherImage,
    classInfo: "",
  };

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
    this.teacherInfo = {
      name: "",
      imageUrl: TeacherImage,
      classInfo: "",
    };
    this.saveToSessionStorage();
  }

  async setTeacherInfo(teacherId) {
    try {
      const teacherInfo = await getTeacherInfo(teacherId);
      runInAction(() => {
        this.teacherInfo = {
          name: teacherInfo.name || "",
          imageUrl: teacherInfo.imageUrl || TeacherImage,
          classInfo: teacherInfo.classInfo || "",
        };
        this.saveToSessionStorage();
      });
    } catch (error) {
      console.error("Error fetching teacher info:", error);
      runInAction(() => {
        this.teacherInfo = {
          name: "",
          imageUrl: TeacherImage,
          classInfo: "",
        };
      });
    }
  }

  saveToSessionStorage() {
    sessionStorage.setItem(
      "AuthStore",
      JSON.stringify({
        isLoggedIn: this.isLoggedIn,
        user: this.user,
        teacherInfo: this.teacherInfo,
      })
    );
  }

  loadFromSessionStorage() {
    const storedData = sessionStorage.getItem("AuthStore");

    if (storedData) {
      const { isLoggedIn, user, teacherInfo } = JSON.parse(storedData);
      this.isLoggedIn = isLoggedIn;
      this.user = user;
      this.teacherInfo = teacherInfo || {
        name: "",
        imageUrl: TeacherImage,
        classInfo: "",
      };
    }
  }
}

export default new AuthStore();
