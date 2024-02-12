import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { render, screen } from "@testing-library/react";
import { server } from "../mocks/server";
import Experts from "./Experts";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("Experts", () => {
  test("should render Experts component", async () => {
    render(
      <Router>
        <Experts />
      </Router>
    );

    const text = screen.queryAllByText("My Bookings");
    expect(text.length).toBeGreaterThan(0);
  });

  test("should render Experts component with correct text", async () => {
    render(
      <Router>
        <Experts />
      </Router>
    );

    expect(
      screen.getByText(/Futsal enthusiasts and fans/i)
    ).toBeInTheDocument();
  });
});
