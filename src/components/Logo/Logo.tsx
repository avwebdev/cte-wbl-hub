import clsx from "clsx";
import Image from "next/image";
import React from "react";

import { FONT_CLASSNAME } from "@/app/font";
import { cn } from "@/utilities/cn";

interface Props {
  className?: string;
  loading?: "lazy" | "eager";
  priority?: "auto" | "high" | "low";
}

export const Logo = (props: Props) => {
  const {
    loading: loadingFromProps,
    priority: priorityFromProps,
    className,
  } = props;

  const loading = loadingFromProps || "lazy";
  const priority = priorityFromProps || "low";

  return (
    <Image
      alt="CTE Logo"
      width={31}
      height={34}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx("aspect-square", className)}
      src="/favicon.svg"
    />
  );
};

export const LogoWithText = (props: Props) => {
  const {
    loading: loadingFromProps,
    priority: priorityFromProps,
    className,
  } = props;

  const loading = loadingFromProps || "lazy";
  const priority = priorityFromProps || "low";

  return (
    <div className={cn("flex items-center gap-2", FONT_CLASSNAME)}>
      <Image
        alt="CTE Logo"
        width={31}
        height={34}
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className={clsx("h-[34px] w-full max-w-[9.375rem]", className)}
        src="/favicon.svg"
      />
      <h1 className="shrink-0 font-sans font-bold">
        CTE WBL Hub
      </h1>
    </div>
  );
};
