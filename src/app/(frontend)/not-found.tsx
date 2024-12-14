import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex w-full flex-col items-center gap-4 py-28 text-center">
      <div className="prose max-w-none">
        <h1>404</h1>
        <p className="mt-0">This page could not be found.</p>
      </div>
      <Button asChild variant="default">
        <Link href="/">Go home</Link>
      </Button>
    </div>
  );
}
