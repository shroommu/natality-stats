import { toWonderXML, fromWonderXML } from "@/app/utils";

export async function POST(request: Request) {
  const body = await request.json();
  const { queryParams } = body;

  const res = await fetch(
    "https://wonder.cdc.gov/controller/datarequest/D149",
    {
      method: "POST",
      body: new URLSearchParams({
        request_xml: toWonderXML(queryParams),
        accept_datause_restrictions: "true",
      }),
    }
  )
    .then((response) => response.text())
    .then((xml) => fromWonderXML(xml));

  return new Response(JSON.stringify(res));
}
