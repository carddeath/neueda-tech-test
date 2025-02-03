import { render, screen, fireEvent } from "@testing-library/react";
import CustomButton from "./customButton";
import "@testing-library/jest-dom";

describe("CustomButton", () => {
  test("renders the button with provided text", () => {
    render(
      <CustomButton
        onClickEvent={() => {}}
        disabled={false}
        buttonText="Click Me"
      />
    );

    expect(
      screen.getByRole("button", { name: "Click Me" })
    ).toBeInTheDocument();
  });

  test("fires the click event when pressed/clicked", () => {
    const handleClick = jest.fn();
    render(
      <CustomButton
        onClickEvent={handleClick}
        disabled={false}
        buttonText="Click Me"
      />
    );

    const button = screen.getByRole("button", { name: "Click Me" });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("does not fire click event when disabled", () => {
    const handleClick = jest.fn();
    render(
      <CustomButton
        onClickEvent={handleClick}
        disabled={true}
        buttonText="Click Me"
      />
    );

    const button = screen.getByRole("button", { name: "Click Me" });
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  test("button is disabled when prop is set", () => {
    render(
      <CustomButton
        onClickEvent={() => {}}
        disabled={true}
        buttonText="Click Me"
      />
    );

    const button = screen.getByRole("button", { name: "Click Me" });
    expect(button).toBeDisabled();
  });
});
