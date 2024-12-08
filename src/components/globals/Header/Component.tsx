import React from "react";

import type { Header as HeaderType } from "@/payload-types";
import { getCachedGlobal } from "@/utilities/getGlobals";
import { HeaderClient } from "./Component.client";

export async function Header() {
  const header: HeaderType = await getCachedGlobal("header", 1)();

  return <HeaderClient header={header} />;
}
