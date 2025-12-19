"use client";

import { useState } from "react";

import Button from "./components/Button";

export default function Home() {
  const [xml, setXml] = useState("");
  const [response, setResponse] = useState("");

  async function getWonderData(xml: string) {
    await fetch("api/get-wonder-data", {
      method: "POST",
      body: JSON.stringify({ xml: xml }),
    }).then((res: Response): void => setResponse(JSON.stringify(res)));
  }

  return (
    <div className="flex flex-col">
      <textarea
        value={xml}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void =>
          setXml(event.target.value)
        }
        className="border-2"
      />
      <Button text="Get Data" onClick={() => getWonderData(xml)} />
      {response}
    </div>
  );
}
