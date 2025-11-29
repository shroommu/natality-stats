"use client";

import { useState } from "react";

import Button from "./components/Button";

export default function Home() {
  const [xml, setXml] = useState("");
  return (
    <div className="flex flex-col">
      <Button text="click" onClick={() => setXml("test")} />
      {xml}
    </div>
  );
}
