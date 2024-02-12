import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { fireEvent, render, screen } from "@testing-library/react";
import { server } from "../mocks/server";
import EditProfile from "./EditProfileComponent";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("Edit Profile Page", () => {
  test("should render correctly", () => {
    render(
      <Router>
        <EditProfile />
      </Router>
    );
  });

  test("should edit profile when the form is submitted", async () => {
    render(
      <Router>
        <EditProfile />
      </Router>
    );

    const firstnameInput = screen.getByTestId("firstName");
    const lastnameInput = screen.getByTestId("lastName");

    fireEvent.change(firstnameInput, { target: { value: "firstname" } });
    fireEvent.change(lastnameInput, { target: { value: "lastname" } });

    expect(firstnameInput.value).toBe("firstname");
    expect(lastnameInput.value).toBe("lastname");
  });
});
