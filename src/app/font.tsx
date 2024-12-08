import localFont from "next/font/local";
import { cn } from "@/utilities/cn";

const UntitledSans = localFont({
  src: [
    {
      path: "../../public/fonts/UntitledSans-Black.woff2",
      weight: "900",
    },
    {
      path: "../../public/fonts/UntitledSans-Bold.woff2",
      weight: "700",
    },
    {
      path: "../../public/fonts/UntitledSans-Medium.woff2",
      weight: "500",
    },
    {
      path: "../../public/fonts/UntitledSans-Regular.woff2",
      weight: "400",
    },
    {
      path: "../../public/fonts/UntitledSans-Light.woff2",
      weight: "300",
    },
    {
      path: "../../public/fonts/UntitledSans-BlackItalic.woff2",
      weight: "900",
      style: "italic",
    },
    {
      path: "../../public/fonts/UntitledSans-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../public/fonts/UntitledSans-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/UntitledSans-RegularItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/UntitledSans-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
  ],
  variable: "--font-untitled-sans",
});

const FONT_CLASSNAME = cn(UntitledSans.className, UntitledSans.variable);

export { FONT_CLASSNAME };
