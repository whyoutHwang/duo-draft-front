import "@testing-library/jest-dom";

jest.mock("react-modal", () => ({
  setAppElement: jest.fn(),
}));

// Mock the auth store
jest.mock("./stores/AuthStore", () => ({
  getUser: jest.fn(() => ({ _id: "mockUserId" })),
  // Add other methods you're using from AuthStore
}));

// Mock the student store
jest.mock("./stores/StudentStore", () => ({
  setStudents: jest.fn(),
  // Add other methods you're using from StudentStore
}));

// Mock the API service
jest.mock("./service/apiService", () => ({
  fetchStudents: jest.fn(() => Promise.resolve([])),
  // Add other API methods you're using
}));
