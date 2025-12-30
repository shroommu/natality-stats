import { create } from "xmlbuilder2";

import { DEFAULT_NATALITY_VARIABLES } from "./constants";

export function toWonderXML(obj: object): string {
  const doc = create().ele(DEFAULT_NATALITY_VARIABLES);

  return doc.end({ headless: true });
}
