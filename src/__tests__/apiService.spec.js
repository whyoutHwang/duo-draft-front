import axiosInstance from "../service/axios";
import { getTeacherInfo } from "../service/apiService";

jest.mock("../service/axios", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

describe("getTeacherInfo", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("successfully fetches teacher info", async () => {
    const teacherId = "661e9d7e86f0e24f8592adc3";
    const mockTeacherData = {
      _id: "661e9d7e86f0e24f8592adc3",
      username: "황인준",
      email: "hij2811@gmail.com",
      classInfo: "3학년 4반",
      name: "황인준",
      imageUrl:
        "https://duodraft-test.s3.ap-northeast-2.amazonaws.com/1721898990361-1718732242372-TEST_IMAGE_25.jpg",
    };

    axiosInstance.get.mockResolvedValue({ data: mockTeacherData });

    const result = await getTeacherInfo(teacherId);

    expect(axiosInstance.get).toHaveBeenCalledWith(
      `/user/teacher/${teacherId}`
    );
    expect(result).toEqual(mockTeacherData);
  });

  it("handles errors when fetching teacher info fails", async () => {
    const teacherId = "661e9d7e86f0e24f8592adc3";
    const errorMessage = "Network Error";

    axiosInstance.get.mockRejectedValue(new Error(errorMessage));

    await expect(getTeacherInfo(teacherId)).rejects.toThrow(errorMessage);
    expect(axiosInstance.get).toHaveBeenCalledWith(
      `/user/teacher/${teacherId}`
    );
  });
});
