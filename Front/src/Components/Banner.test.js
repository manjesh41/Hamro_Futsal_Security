import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { render, screen } from "@testing-library/react";
import { server } from "../mocks/server";
import Banner from "./Banner";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("Banner", () => {
  test("should render Banner component with 'Hamro Futsal' text", async () => {
    render(
      <Router>
        <Banner />
      </Router>
    );

    const text = screen.queryAllByText("Hamro Futsal");
    expect(text.length).toBeGreaterThan(0);
  });

  test("should render Banner component with 'Book Now' text", async () => {
    render(
      <Router>
        <Banner />
      </Router>
    );

    expect(screen.getByText(/Book Now/i)).toBeInTheDocument();
  });
});
