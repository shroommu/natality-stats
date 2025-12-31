import { toWonderXML } from "@/app/utils";

export async function POST(request: Request) {
  const body = await request.json();
  const { xml } = body;

  await fetch("https://wonder.cdc.gov/controller/datarequest/D149", {
    method: "POST",
    body: new URLSearchParams({
      request_xml: toWonderXML(xml),
      accept_datause_restrictions: "true",
    }),
  })
    .then((response) => response.text())
    .then((data) => console.log(data));

  return new Response();
}
