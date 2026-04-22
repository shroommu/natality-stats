import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import VBAC from "@/app/vbac/page";

describe("VBAC page", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders form sections and default probability", () => {
    render(<VBAC />);

    expect(
      screen.getByRole("heading", { name: "Predicting VBAC Success" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("VBAC Success Probability: N/A"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Parameters" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Predict" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Technical Details" }),
    ).toBeInTheDocument();
  });

  it("submits payload and renders prediction result", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue({ vbac_prediction: 77 }),
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<VBAC />);

    await user.click(screen.getByRole("button", { name: "Predict" }));

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("undefined/predict-vbac");
    expect(options.method).toBe("POST");
    expect(options.headers).toEqual({ "Content-Type": "application/json" });

    const payload = JSON.parse(options.body as string);
    expect(payload.timeOfBirth).toBe("1200");
    expect(payload.laborInduced).toBe(false);
    expect(payload.attendantAtBirth).toBe(1);

    expect(
      await screen.findByText("VBAC Success Probability: 77%"),
    ).toBeInTheDocument();
  });

  it("updates editable form fields before predicting", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue({ vbac_prediction: 55 }),
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<VBAC />);

    await user.click(screen.getByLabelText("Was labor induced?"));
    await user.click(
      within(screen.getByRole("listbox")).getByRole("option", { name: "Yes" }),
    );
    await user.click(screen.getByLabelText("Was labor augmented?"));
    await user.click(
      within(screen.getByRole("listbox")).getByRole("option", { name: "Yes" }),
    );
    await user.click(screen.getByLabelText("Attendant at birth"));
    await user.click(
      within(screen.getByRole("listbox")).getByRole("option", {
        name: "Doctor (DO)",
      }),
    );
    const timeInput = document.querySelector(
      'input[name="timeOfBirth"]',
    ) as HTMLInputElement;
    fireEvent.change(timeInput, {
      target: { value: "01:30 PM" },
    });

    await user.click(screen.getByLabelText("Number of previous live births"));
    await user.click(
      within(screen.getByRole("listbox")).getByRole("option", { name: "2" }),
    );
    await user.click(screen.getByLabelText("Number of previous C-sections"));
    await user.click(
      within(screen.getByRole("listbox")).getByRole("option", { name: "3" }),
    );
    fireEvent.change(screen.getByLabelText("Mother's BMI"), {
      target: { value: "22" },
    });
    fireEvent.change(screen.getByLabelText("Baby's birth weight in grams"), {
      target: { value: "3500" },
    });
    fireEvent.change(
      screen.getByLabelText("Mother's weight gain during pregnancy"),
      {
        target: { value: "35" },
      },
    );
    fireEvent.change(screen.getByLabelText("Months since last live birth"), {
      target: { value: "30" },
    });
    fireEvent.change(screen.getByLabelText("Number of prenatal visits"), {
      target: { value: "12" },
    });
    fireEvent.change(screen.getByLabelText("Mother's age at delivery"), {
      target: { value: "28" },
    });
    fireEvent.change(screen.getByLabelText("Gestational age in weeks"), {
      target: { value: "39" },
    });

    await user.click(screen.getByRole("button", { name: "Predict" }));

    const [, options] = fetchMock.mock.calls[0];
    const payload = JSON.parse(options.body as string);
    expect(payload.laborInduced).toBe(true);
    expect(payload.laborAugmented).toBe(true);
    expect(payload.attendantAtBirth).toBe(2);
    expect(payload.priorBirthsNowLiving).toBe(2);
    expect(payload.numberOfPreviousCSections).toBe(3);
    expect(payload.bmi).toBe("22");
    expect(payload.birthWeightInGrams).toBe("3500");
    expect(payload.weightGain).toBe("35");
    expect(payload.intervalSinceLastLiveBirth).toBe("30");
    expect(payload.numberOfPrenatalVisits).toBe("12");
    expect(payload.mothersAge).toBe("28");
    expect(payload.gestationalAgeInWeeks).toBe("39");
  }, 20000);
});
