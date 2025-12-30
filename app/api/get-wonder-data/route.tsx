import { toWonderXML } from "@/app/utils";

export async function POST(request: Request) {
  const body = await request.json();
  const { xml } = body;

  return await fetch("https://wonder.cdc.gov/controller/datarequest/D149", {
    method: "POST",
    body: JSON.stringify({
      request_xml: toWonderXML(xml),
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  // return new Response(JSON.stringify(xml), {
  //   status: 201,
  //   headers: { "Content-Type": "application/json" },
  // });
}
