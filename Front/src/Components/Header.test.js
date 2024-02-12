import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { render, screen } from "@testing-library/react";
import { server } from "../mocks/server";
import Header from "./Header";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("Header", () => {
  test("Should have a header", () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });
});
