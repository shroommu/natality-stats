import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { VBACModel } from "@/app/vbac/components/model";

describe("VBACModel", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders probability card and form with defaults", () => {
    render(<VBACModel />);

    expect(screen.getByText("VBAC Success Probability")).toBeInTheDocument();
    expect(screen.getByText("--%")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Parameters" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Predict" })).toBeInTheDocument();
  });

  it("renders all parameter fields", () => {
    render(<VBACModel />);

    expect(screen.getByLabelText("Was labor induced?")).toBeInTheDocument();
    expect(screen.getByLabelText("Was labor augmented?")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Number of previous live births"),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Number of previous C-sections"),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Fetal presentation at delivery"),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Gestational age in weeks"),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Mother's BMI")).toBeInTheDocument();
  });

  it("calls predict API with default parameters and displays result", async () => {
    const user = userEvent.setup();

    const fetchMock = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue({ vbac_prediction: 77 }),
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<VBACModel />);

    await user.click(screen.getByRole("button", { name: "Predict" }));

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/predict-vbac");
    expect(options.method).toBe("POST");
    expect(options.headers).toEqual({ "Content-Type": "application/json" });

    const payload = JSON.parse(options.body as string);
    expect(payload).toEqual({
      laborInduced: false,
      laborAugmented: false,
      priorBirthsNowLiving: 1,
      numberOfPreviousCSections: 1,
      fetalPresentationAtDelivery: 1,
      gestationalAgeInWeeks: 40,
      bmi: 20,
    });

    expect(await screen.findByText("77%")).toBeInTheDocument();
  });

  it("sends updated payload after editing fields", async () => {
    const user = userEvent.setup();

    const fetchMock = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue({ vbac_prediction: 55 }),
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<VBACModel />);

    await user.click(screen.getByLabelText("Was labor induced?"));
    await user.click(
      within(screen.getByRole("listbox")).getByRole("option", { name: "Yes" }),
    );
    await user.click(screen.getByLabelText("Was labor augmented?"));
    await user.click(
      within(screen.getByRole("listbox")).getByRole("option", { name: "Yes" }),
    );
    await user.click(screen.getByLabelText("Number of previous live births"));
    await user.click(
      within(screen.getByRole("listbox")).getByRole("option", { name: "2" }),
    );
    await user.click(screen.getByLabelText("Number of previous C-sections"));
    await user.click(
      within(screen.getByRole("listbox")).getByRole("option", { name: "3" }),
    );
    await user.click(screen.getByLabelText("Fetal presentation at delivery"));
    await user.click(
      within(screen.getByRole("listbox")).getByRole("option", {
        name: "Breech",
      }),
    );
    await user.click(screen.getByLabelText("Gestational age in weeks"));
    await user.click(
      within(screen.getByRole("listbox")).getByRole("option", { name: "39" }),
    );
    fireEvent.change(screen.getByLabelText("Mother's BMI"), {
      target: { value: "22" },
    });

    await user.click(screen.getByRole("button", { name: "Predict" }));

    const [, options] = fetchMock.mock.calls[0];
    const payload = JSON.parse(options.body as string);
    expect(payload.laborInduced).toBe(true);
    expect(payload.laborAugmented).toBe(true);
    expect(payload.priorBirthsNowLiving).toBe(2);
    expect(payload.numberOfPreviousCSections).toBe(3);
    expect(payload.fetalPresentationAtDelivery).toBe(2);
    expect(payload.gestationalAgeInWeeks).toBe(39);
    expect(payload.bmi).toBe("22");

    expect(await screen.findByText("55%")).toBeInTheDocument();
  }, 20000);
});
