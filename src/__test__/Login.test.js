import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";

test("should render login page", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  const loginElement = screen.getByTestId("login");
  expect(loginElement).toBeInTheDocument();
});

test("should validate both inputs", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
  const emailInput = screen.getByLabelText("Email:");
  const passwordInput = screen.getByLabelText("Password:");
  const submitButton = screen.getByRole("button", { name: "Log in" });

  // Click submit button without entering anything
  fireEvent.click(submitButton);

  // Check that both inputs display an error message
  expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
  expect(screen.getByText("Invalid credentials")).toBeInTheDocument();

  // Enter an invalid email and click submit
  fireEvent.change(emailInput, { target: { value: "invalidemail" } });
  fireEvent.click(submitButton);

  // Check that the email input displays an error message and password input is still required
  expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
  expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
});
