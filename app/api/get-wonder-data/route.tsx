import { toWonderXML } from "@/app/utils";

export async function POST(request: Request) {
  const body = await request.json();
  const { xml } = body;

  console.log(
    JSON.stringify({
      request_xml: toWonderXML(xml),
      accept_datause_restrictions: "true",
    })
  );

  return await fetch("https://wonder.cdc.gov/controller/datarequest/D149", {
    method: "POST",
    body: JSON.stringify({
      request_xml: toWonderXML(xml),
      accept_datause_restrictions: "true",
    }),
  });

  // return new Response(JSON.stringify(xml), {
  //   status: 201,
  //   headers: { "Content-Type": "application/json" },
  // });
}
