import React from "react"
import Image from "next/image";
import {Button} from "@heroui/react";

export default function Home() {
  return <React.Fragment>
    <div className={"flex max-w-10"}>

      <Button variant={"shadow"} color={"primary"}>
        Apretar
      </Button>
    </div>
  </React.Fragment>
}
