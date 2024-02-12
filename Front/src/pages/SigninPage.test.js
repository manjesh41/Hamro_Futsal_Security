import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { server } from "../mocks/server";
import SigninPage from "./SigninPage";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Signin Page", () => {
  //   let providerProps;
  //   beforeEach(() => {
  //     providerProps = {
  //       user: null,
  //       setUser: jest.fn(),
  //       isLoading: false,
  //       setIsLoading: jest.fn(),
  //     };
  //   });

  test("should render correctly", () => {
    render(
      <Router>
        <SigninPage />
      </Router>
    );
  });

  test("should display at least one 'Sign In' text", () => {
    render(
      <Router>
        <SigninPage />
      </Router>
    );

    const signInTextElements = screen.queryAllByText("Sign In");
    expect(signInTextElements.length).toBeGreaterThan(0);
  });

  test("should display input fields for username and password", () => {
    render(
      <Router>
        <SigninPage />
      </Router>
    );

    const usernameInput = screen.getByPlaceholderText(/Enter your username/i);
    const passwordInput = screen.getByPlaceholderText(/Enter your password/i);

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test("should log in a user when the form is submitted", async () => {
    render(
      <Router>
        <SigninPage />
      </Router>
    );

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText("Enter your username"), {
      target: { value: "testuser" },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
      target: { value: "testpassword" },
    });

    // Click the submit button

    const signInButton = screen.getByRole("button", { name: /Sign In/i });

    fireEvent.click(signInButton);

    // Wait for the API call to complete=
    await waitFor(() => {
      expect(window.location.href).toBe("http://localhost/");
    });
  });
});
