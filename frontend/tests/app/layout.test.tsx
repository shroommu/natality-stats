import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

import RootLayout, { metadata } from "@/app/layout";

describe("RootLayout", () => {
  it("exports page metadata", () => {
    expect(metadata.title).toBe("Natality Stats");
  });

  it("renders html and body wrappers around children", () => {
    const markup = renderToStaticMarkup(
      <RootLayout>
        <main>Child Content</main>
      </RootLayout>,
    );

    expect(markup).toContain('<html lang="en">');
    expect(markup).toContain("<body class=");
    expect(markup).toContain("Child Content");
  });
});
