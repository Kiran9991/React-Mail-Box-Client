import { render, fireEvent } from "@testing-library/react";
import { useDispatch } from "react-redux";
import SingleItem from "./SingleItem";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

describe("SingleItem Component", () => {
  it("triggers sendIsView function and dispatches action on click", () => {
    const dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);

    const props = {
      id: "1",
      title: "Test Title",
      read: "0",
      date: "2024-04-02T08:00:00Z",
      subject: "Test Subject",
    };

    const { getByTestId } = render(<SingleItem {...props} />);
    fireEvent.click(getByTestId("single-item"));

    expect(dispatchMock).toHaveBeenCalledWith({
      type: "mail/changeViewed",
      payload: "1",
    });
  });
});

describe("SingleItem Component", () => {
  it("returns formatted date in the expected format", () => {
    const props = {
      id: "1",
      title: "Test Title",
      read: "0",
      date: "2024-04-02T08:00:00Z",
      subject: "Test Subject",
    };

    const { formattedDate } = SingleItem.prototype;
    const result = formattedDate(props.date);

    expect(result).toBe("2 Apr, 08:00");
  });
});

describe("SingleItem Component", () => {
  it('renders badge when read prop is "0"', () => {
    const props = {
      id: "1",
      title: "Test Title",
      read: "0",
      date: "2024-04-02T08:00:00Z",
      subject: "Test Subject",
    };

    const { getByText } = render(<SingleItem {...props} />);
    const badgeElement = getByText("");

    expect(badgeElement).toBeInTheDocument();
  });
});
