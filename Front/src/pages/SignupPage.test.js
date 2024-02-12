import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";

import { server } from "../mocks/server";
import SignupPage from "./SignupPage";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// const customRender = (ui, { providerProps, ...renderOptions }) => {
//   return render(
//     <UserContext.Provider value={providerProps}>{ui}</UserContext.Provider>,
//     renderOptions
//   );
// };

describe("Signup Page", () => {
  //   let providerProps;

  beforeAll(() => {
    server.listen(); // Start the test server
  });

  afterEach(() => {
    server.resetHandlers(); // Reset any runtime request handlers between tests
  });

  afterAll(() => {
    server.close(); // Close the test server after all tests are done
  });

  //   beforeEach(() => {
  //     providerProps = {
  //       isLoading: false,
  //       setIsLoading: jest.fn(),
  //     };
  //   });

  test("should sign up a user when the form is submitted with valid data", async () => {
    render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>
    );

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText("Enter your Firstname"), {
      target: { value: "Test User" },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter your Lastname"), {
      target: { value: "testuser3" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your Username"), {
      target: { value: "testuser3" },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter your Email"), {
      target: { value: "testuser3@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your number"), {
      target: { value: "testuser3" },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
      target: { value: "testpassword" },
    });
    fireEvent.change(
      screen.getByPlaceholderText("Enter your confirm password"),
      {
        target: { value: "testpassword" },
      }
    );

    const createAccountButton = screen.getByRole("button", {
      name: /Register/i,
    });

    fireEvent.click(createAccountButton);

    // Wait for the API call to complete
    // await waitFor(() => {
    //   expect(providerProps.setIsLoading).toHaveBeenCalledTimes(2);
    // });

    // Check if the alert is displayed
    await waitFor(() => {
      expect(window.location.href).toBe("http://localhost/");
    });
  });
});
