import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { render, screen } from "@testing-library/react";
import { server } from "../mocks/server";
import Footer from "./Footer";

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("Footer", () => {
  test("should render Footer component", async () => {
    render(
      <Router>
        <Footer />
      </Router>
    );

    const footer = screen.getAllByRole("contentinfo");
    expect(footer.length).toBeGreaterThan(0);
  });
});
