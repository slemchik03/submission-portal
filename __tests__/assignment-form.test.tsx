import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AssignmentForm from "../components/assignment-form";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { candidateLevels } from "@/lib/queries/candidate-levels";

const queryClient = new QueryClient();

queryClient.setQueryData(candidateLevels.all().queryKey, [
  "Junior",
  "Senior",
  "Middle",
  "Principal",
]);

const AssignmentFormWithClient = ({ client }: { client?: QueryClient }) => (
  <QueryClientProvider client={client || queryClient}>
    <AssignmentForm />
  </QueryClientProvider>
);

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("AssignmentForm", () => {
  it("renders the form description", () => {
    render(<AssignmentFormWithClient />);
    expect(
      screen.getByText(
        "Please fill out the form below to submit your assignment."
      )
    ).toBeInTheDocument();
  });

  it("renders the form fields", () => {
    render(<AssignmentFormWithClient />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Assignment Description")).toBeInTheDocument();
    expect(screen.getByLabelText("GitHub URL")).toBeInTheDocument();
  });

  it("displays errors when the form is submitted without filling out the required fields", async () => {
    render(<AssignmentFormWithClient />);
    const submitButton = screen.getByText("Submit Assignment");
    await userEvent.click(submitButton);
    expect(screen.getAllByTestId("error")).toHaveLength(5);
  });

  it("disables the submit button when the form is invalid", async () => {
    render(<AssignmentFormWithClient />);
    const submitButton = screen.getByText("Submit Assignment");
    await userEvent.click(submitButton);
    expect(submitButton).toBeDisabled();
  });

  it("submits the form with the correct data", async () => {
    const root = render(<AssignmentFormWithClient />);
    const submitButton = screen.getByText("Submit Assignment");
    await userEvent.type(screen.getByLabelText("Name"), "John Doe");
    await userEvent.type(
      screen.getByLabelText("Email"),
      "vadimmaster228@gmail.com"
    );
    await userEvent.type(
      screen.getByLabelText("Assignment Description"),
      "aahahhahahahahahhaha"
    );
    await userEvent.type(
      screen.getByLabelText("GitHub URL"),
      "https://test.com"
    );

    const select = root.container.querySelector("select")!;
    await userEvent.selectOptions(select, "Junior");
    await userEvent.click(submitButton);
    const form = root.container.querySelector("form")!;

    expect(form).toHaveAttribute("data-errors", "false");
  });
  it("renders candidate levels", async () => {
    const root = render(<AssignmentFormWithClient />);
    const select = root.container.querySelector("select")!;
    expect(select).toBeInTheDocument();
    expect(screen.getByText("Junior")).toBeInTheDocument();
    expect(screen.getByText("Senior")).toBeInTheDocument();
    expect(screen.getByText("Middle")).toBeInTheDocument();
    expect(screen.getByText("Principal")).toBeInTheDocument();
  });
  it("render rerror candidate levels", async () => {
    const queryClient = new QueryClient();
    queryClient.setQueryData(candidateLevels.all().queryKey, null);
    const root = render(<AssignmentFormWithClient client={queryClient} />);
    const select = root.container.querySelector("select")!;
    expect(select).toBeInTheDocument();
    expect(
      screen.getByText("Error occured during levels fetching!")
    ).toBeInTheDocument();
  });
});
