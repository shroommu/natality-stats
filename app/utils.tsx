import { create, fragment } from "xmlbuilder2";
import { XMLBuilder } from "xmlbuilder2/lib/interfaces";

const ACCEPT_DATAUSE_RESTRICTIONS_FRAGMENT =
  "<parameter><name>accept_datause_restrictions</name><value>true</value></parameter>";

export function toWonderXML(obj: object): string {
  const fragments: XMLBuilder[] = [];

  for (const [key, value] of Object.entries(obj)) {
    fragments.push(
      fragment()
        .ele("parameter")
        .ele("name")
        .txt(key)
        .up()
        .ele("value")
        .txt(value)
        .up()
        .up()
    );
  }

  for (const frag of fragments) {
    console.log(frag.end({ prettyPrint: true }));
  }

  const doc = create()
    .ele("request-parameters")
    .ele(ACCEPT_DATAUSE_RESTRICTIONS_FRAGMENT);

  for (const frag of fragments) {
    doc.up().import(frag);
  }

  console.log(doc.end({ prettyPrint: true }));

  return doc.end();
}
