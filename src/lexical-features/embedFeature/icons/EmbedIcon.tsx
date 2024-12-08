import { Youtube } from "lucide-react";
import type { SVGProps } from "react";
import React from "react";

export function EmbedIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Youtube {...props} className="size-4" />
  );
}
