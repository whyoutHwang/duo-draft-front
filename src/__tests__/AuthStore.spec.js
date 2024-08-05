import AuthStore from "../stores/AuthStore";
import { getTeacherInfo } from "../service/apiService";
import TeacherImage from "../assets/image/character/Teacher_1.png";

jest.mock("../service/apiService");

describe("AuthStore", () => {
  let authStore;

  beforeEach(() => {
    jest.resetModules();
    authStore = require("../stores/AuthStore").default;
    jest.spyOn(Storage.prototype, "setItem");
    jest.spyOn(Storage.prototype, "getItem");
    sessionStorage.clear();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("setUser updates user and isLoggedIn", () => {
    const user = { id: 1, name: "Test User" };
    authStore.setUser(user);
    expect(authStore.user).toEqual(user);
    expect(authStore.isLoggedIn).toBe(true);
    expect(sessionStorage.setItem).toHaveBeenCalled();
  });

  test("logout clears user data", () => {
    authStore.setUser({ id: 1, name: "Test User" });
    authStore.logout();
    expect(authStore.user).toBeNull();
    expect(authStore.isLoggedIn).toBe(false);
    expect(authStore.teacherInfo).toEqual({
      name: "",
      imageUrl: "",
      classInfo: "",
    });
    expect(sessionStorage.setItem).toHaveBeenCalled();
  });

  test("setTeacherInfo updates teacher information", async () => {
    const mockTeacherInfo = {
      name: "Test Teacher",
      imageUrl: "test-image-url",
      classInfo: "Test Class",
    };
    getTeacherInfo.mockResolvedValue(mockTeacherInfo);

    await authStore.setTeacherInfo("testId");
    expect(authStore.teacherInfo).toEqual(mockTeacherInfo);
    expect(sessionStorage.setItem).toHaveBeenCalled();
  });

  test("setTeacherInfo handles missing data", async () => {
    const mockTeacherInfo = { name: "Test Teacher" };
    getTeacherInfo.mockResolvedValue(mockTeacherInfo);

    await authStore.setTeacherInfo("testId");
    expect(authStore.teacherInfo).toEqual({
      name: "Test Teacher",
      imageUrl: TeacherImage,
      classInfo: "",
    });
  });

  test("setTeacherInfo handles error", async () => {
    getTeacherInfo.mockRejectedValue(new Error("API Error"));
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await authStore.setTeacherInfo("testId");
    expect(consoleSpy).toHaveBeenCalledWith(
      "Error fetching teacher info:",
      expect.any(Error)
    );
    expect(authStore.teacherInfo).toEqual({
      name: "",
      imageUrl: TeacherImage,
      classInfo: "",
    });

    consoleSpy.mockRestore();
  });

  test("saveToSessionStorage saves correct data", () => {
    const user = { id: 1, name: "Test User" };
    authStore.setUser(user);
    authStore.teacherInfo = {
      name: "Test Teacher",
      imageUrl: "test-image-url",
      classInfo: "Test Class",
    };

    authStore.saveToSessionStorage();

    expect(sessionStorage.setItem).toHaveBeenCalledWith(
      "AuthStore",
      JSON.stringify({
        isLoggedIn: true,
        user: user,
        teacherInfo: authStore.teacherInfo,
      })
    );
  });

  test("loadFromSessionStorage loads stored data", () => {
    const mockStoredData = JSON.stringify({
      isLoggedIn: true,
      user: { id: 1, name: "Stored User" },
      teacherInfo: {
        name: "Stored Teacher",
        imageUrl: "stored-image-url",
        classInfo: "Stored Class",
      },
    });
    sessionStorage.getItem.mockReturnValue(mockStoredData);

    authStore.loadFromSessionStorage();
    expect(authStore.isLoggedIn).toBe(true);
    expect(authStore.user).toEqual({ id: 1, name: "Stored User" });
    expect(authStore.teacherInfo).toEqual({
      name: "Stored Teacher",
      imageUrl: "stored-image-url",
      classInfo: "Stored Class",
    });
  });

  test("loadFromSessionStorage handles missing data", () => {
    sessionStorage.getItem.mockReturnValue(null);

    authStore.loadFromSessionStorage();
    expect(authStore.isLoggedIn).toBe(false);
    expect(authStore.user).toBeNull();
    expect(authStore.teacherInfo).toEqual({
      name: "",
      imageUrl: "",
      classInfo: "",
    });
  });
});
