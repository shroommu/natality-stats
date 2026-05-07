import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import VBAC from "@/app/vbac/page";

describe("VBAC page", () => {
  afterEach(() => {
    delete process.env.NEXT_PUBLIC_BACKEND_URL;
    vi.unstubAllGlobals();
  });

  it("renders form sections and default probability", () => {
    render(<VBAC />);

    expect(
      screen.getByRole("heading", { name: "Predicting VBAC Success" }),
    ).toBeInTheDocument();
    expect(screen.getByText("VBAC Success Probability")).toBeInTheDocument();
    expect(screen.getByText("--%")).toBeInTheDocument();
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
    process.env.NEXT_PUBLIC_BACKEND_URL = "http://localhost:8000";

    const fetchMock = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue({ vbac_prediction: 77 }),
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<VBAC />);

    await user.click(screen.getByRole("button", { name: "Predict" }));

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("http://localhost:8000/predict-vbac");
    expect(options.method).toBe("POST");
    expect(options.headers).toEqual({ "Content-Type": "application/json" });

    const payload = JSON.parse(options.body as string);
    expect(payload).toEqual({
      laborInduced: false,
      laborAugmented: false,
      attendantAtBirth: 1,
      priorBirthsNowLiving: 1,
      numberOfPreviousCSections: 1,
      bmi: 15,
      intervalSinceLastLiveBirth: 24,
      gestationalAgeInWeeks: 40,
    });

    expect(await screen.findByText("77%")).toBeInTheDocument();
  });

  it("updates editable form fields before predicting", async () => {
    const user = userEvent.setup();
    process.env.NEXT_PUBLIC_BACKEND_URL = "http://localhost:8000";

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
    fireEvent.change(screen.getByLabelText("Months since last live birth"), {
      target: { value: "30" },
    });
    await user.click(screen.getByLabelText("Gestational age in weeks"));
    await user.click(
      within(screen.getByRole("listbox")).getByRole("option", { name: "39" }),
    );

    await user.click(screen.getByRole("button", { name: "Predict" }));

    const [, options] = fetchMock.mock.calls[0];
    const payload = JSON.parse(options.body as string);
    expect(payload.laborInduced).toBe(true);
    expect(payload.laborAugmented).toBe(true);
    expect(payload.attendantAtBirth).toBe(2);
    expect(payload.priorBirthsNowLiving).toBe(2);
    expect(payload.numberOfPreviousCSections).toBe(3);
    expect(payload.bmi).toBe("22");
    expect(payload.intervalSinceLastLiveBirth).toBe("30");
    expect(payload.gestationalAgeInWeeks).toBe(39);

    expect(await screen.findByText("55%")).toBeInTheDocument();
  }, 20000);
});
