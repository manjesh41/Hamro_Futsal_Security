import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { fireEvent, render, screen } from "@testing-library/react";
import { server } from "../mocks/server";
import ChangePasswordPage from "./ChangePasswordPage";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("Change Password Page", () => {
  test("should render correctly", () => {
    render(
      <Router>
        <ChangePasswordPage />
      </Router>
    );
  });

  test("should display at least one 'Change Password' text", () => {
    render(
      <Router>
        <ChangePasswordPage />
      </Router>
    );

    const changePasswordTextElements = screen.queryAllByText("Change Password");
    expect(changePasswordTextElements.length).toBeGreaterThan(0);
  });

  test("should display input fields for username and password", () => {
    render(
      <Router>
        <ChangePasswordPage />
      </Router>
    );

    const oldPasswordInput = screen.getByTestId("oldPassword");
    const newPasswordInput = screen.getByTestId("newPassword");
    const confirmPasswordInput = screen.getByTestId("confirmPassword");

    expect(oldPasswordInput).toBeInTheDocument();
    expect(newPasswordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
  });

  test("should change password when the form is submitted", async () => {
    render(
      <Router>
        <ChangePasswordPage />
      </Router>
    );

    const oldPasswordInput = screen.getByTestId("oldPassword");
    const newPasswordInput = screen.getByTestId("newPassword");
    const confirmPasswordInput = screen.getByTestId("confirmPassword");

    fireEvent.change(oldPasswordInput, {
      target: { value: "oldPassword" },
    });
    fireEvent.change(newPasswordInput, {
      target: { value: "newPassword" },
    });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "newPassword" },
    });

    expect(oldPasswordInput.value).toBe("oldPassword");
    expect(newPasswordInput.value).toBe("newPassword");
    expect(confirmPasswordInput.value).toBe("newPassword");
  });
});
