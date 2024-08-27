import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

// Mock protected route components
jest.mock("./ProtectedRoute", () => ({ children }) => <div>{children}</div>);
jest.mock("./ProtectedStudentRoute", () => ({ children }) => (
  <div>{children}</div>
));

// Mock other components if necessary
jest.mock("./pages/Signin", () => () => <div>Signin Page</div>);
jest.mock("./pages/Signup", () => () => <div>Signup Page</div>);
jest.mock("./pages/Main", () => () => <div>Main Page</div>);

describe("App Component", () => {
  test("renders Signin page on /signin route", () => {
    render(
      <MemoryRouter initialEntries={["/signin"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Signin Page/i)).toBeInTheDocument();
  });

  test("renders Signup page on /signup route", () => {
    render(
      <MemoryRouter initialEntries={["/signup"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Signup Page/i)).toBeInTheDocument();
  });

  test("renders Main page on / route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Main Page/i)).toBeInTheDocument();
  });
});
