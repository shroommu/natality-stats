import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Card } from "@/components";

describe("Card", () => {
  it("renders title, description, and children", () => {
    render(
      <Card title="Summary" description="Details">
        <span>Content</span>
      </Card>,
    );

    expect(screen.getByRole("heading", { name: "Summary" })).toBeInTheDocument();
    expect(screen.getByText("Details")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders children without title and description", () => {
    render(
      <Card>
        <span>Only Child</span>
      </Card>,
    );

    expect(screen.getByText("Only Child")).toBeInTheDocument();
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("renders description-only card with children", () => {
    render(
      <Card description="Only description">
        <span>Body</span>
      </Card>,
    );

    expect(screen.getByText("Only description")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("renders title-only card with children", () => {
    render(
      <Card title="Only title">
        <span>Body</span>
      </Card>,
    );

    expect(screen.getByRole("heading", { name: "Only title" })).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
    expect(screen.queryByText("Only description")).not.toBeInTheDocument();
  });

  it("renders without children", () => {
    render(<Card title="No body" description="No children provided" />);

    expect(screen.getByRole("heading", { name: "No body" })).toBeInTheDocument();
    expect(screen.getByText("No children provided")).toBeInTheDocument();
    expect(screen.queryByText("Body")).not.toBeInTheDocument();
  });
});
