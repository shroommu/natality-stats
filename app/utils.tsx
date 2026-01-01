import { create, convert } from "xmlbuilder2";

import { DEFAULT_NATALITY_VARIABLES } from "./constants";

export function toWonderXML(queryParams: object): string {
  const doc = create().ele(DEFAULT_NATALITY_VARIABLES);

  return doc.end({ headless: true });
}

export function fromWonderXML(xml: string): object {
  const doc = create(xml);

  const table = doc.find((n) => n.node.nodeName == "data-table", true, true);

  const rows = table?.filter((n) => n.node.nodeName == "r");

  const tableObj = {};

  for (const row of rows) {
    const label = row.first().toObject()["c"]["@l"];
    const value = row.last().toObject()["c"]["@v"];
    Object.assign(tableObj, { [label]: value });
  }

  return tableObj;
}
