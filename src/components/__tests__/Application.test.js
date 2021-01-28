import React from "react";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  queryByAltText,
  getByTestId,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);
describe("Application", () => {
  test("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
  //
  test("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "SAVING")).toBeInTheDocument();

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  //(1)renders data
  test("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    //(2) waits for "Archie Cohen" to be displayed"
    await waitForElement(() => container, "Archie Cohen");

    //(3) click DELETE button on the booked appointment
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find((appointment) => queryByText(appointment, "Archie Cohen"));
    fireEvent.click(getByAltText(appointment, "Delete"));

    //(4) check CONFIRM message shows
    expect(getByText(appointment, "Confirm")).toBeInTheDocument();

    //(5) Click CONFIRM button
    fireEvent.click(getByText(appointment, "Confirm"));

    //(6) check that the deleting status shows

    expect(getByText(appointment, "DELETING")).toBeInTheDocument();

    // (7) Wait until the element with the "Add" button is displayed.
    debug();
    await waitForElement(() => getByAltText(appointment, "Add"));

    // (8) Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  });

  test.only("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    //(1) renders data
    const { container, debug } = render(<Application />);

    //(2) waits for "Archie Cohen" to be displayed
    await waitForElement(() => container, "Archie Cohen");

    //(3) click EDIT button on the booked appointment
    const appointment = getAllByTestId(container, "appointment");
    const appointments = appointment[0];
    // debug();

    debug();
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    //(4) check for form to allow for editing.
  });
});






