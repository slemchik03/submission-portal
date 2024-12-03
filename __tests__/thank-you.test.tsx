import { render, screen } from "@testing-library/react";
import ThankYou from "../components/thank-you";
import "@testing-library/jest-dom";

describe("ThankYou Component", () => {
  const message = "Your submission has been received!";
  const submitedFields = {
    Name: "John Doe",
    Email: "john.doe@example.com",
    Message: "Hello, this is a test message.",
  };

  it("renders the thank you message", () => {
    render(<ThankYou message={message} submitedFields={submitedFields} />);
    expect(screen.getByText("Thank You!")).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it("renders the submitted fields", () => {
    render(<ThankYou message={message} submitedFields={submitedFields} />);
    Object.entries(submitedFields).forEach(([key, val]) => {
      expect(screen.getByText(`${key}:`)).toBeInTheDocument();
      expect(screen.getByText(val)).toBeInTheDocument();
    });
  });

  it("renders the back to home button", () => {
    render(<ThankYou message={message} submitedFields={submitedFields} />);
    const backButton = screen.getByRole("link", { name: /back to home/i });
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveAttribute("href", "/");
  });
});
