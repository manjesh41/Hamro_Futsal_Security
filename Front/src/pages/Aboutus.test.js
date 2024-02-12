import { render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Aboutus from "./Aboutus";

describe("About us page test", () => {
  test("should have a header", () => {
    render(
      <Router>
        <Aboutus />
      </Router>
    );

    const header = screen.getAllByRole("banner");
    expect(header.length).toBeGreaterThan(0);
  });

  test("should have a footer", () => {
    render(
      <Router>
        <Aboutus />
      </Router>
    );

    const footer = screen.getAllByRole("contentinfo");
    expect(footer.length).toBeGreaterThan(0);
  });
});
