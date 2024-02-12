import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { render, screen } from "@testing-library/react";
import { server } from "../mocks/server";
import About from "./About";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("About", () => {
  test("should render About component", async () => {
    render(
      <Router>
        <About />
      </Router>
    );

    expect(screen.getByText(/About Us/i)).toBeInTheDocument();
  });

  test("should render About component with correct text", async () => {
    render(
      <Router>
        <About />
      </Router>
    );

    expect(screen.getByText(/Send Reviews/i)).toBeInTheDocument();
  });
});
