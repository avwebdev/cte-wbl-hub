import type { TextField } from "payload";

const TAILWIND_COLORS = [
  "bg-black",
  "bg-white",
  "bg-slate-50",
  "bg-slate-100",
  "bg-slate-200",
  "bg-slate-300",
  "bg-slate-400",
  "bg-slate-500",
  "bg-slate-600",
  "bg-slate-700",
  "bg-slate-800",
  "bg-slate-900",
  "bg-slate-950",
  "bg-gray-50",
  "bg-gray-100",
  "bg-gray-200",
  "bg-gray-300",
  "bg-gray-400",
  "bg-gray-500",
  "bg-gray-600",
  "bg-gray-700",
  "bg-gray-800",
  "bg-gray-900",
  "bg-gray-950",
  "bg-zinc-50",
  "bg-zinc-100",
  "bg-zinc-200",
  "bg-zinc-300",
  "bg-zinc-400",
  "bg-zinc-500",
  "bg-zinc-600",
  "bg-zinc-700",
  "bg-zinc-800",
  "bg-zinc-900",
  "bg-zinc-950",
  "bg-neutral-50",
  "bg-neutral-100",
  "bg-neutral-200",
  "bg-neutral-300",
  "bg-neutral-400",
  "bg-neutral-500",
  "bg-neutral-600",
  "bg-neutral-700",
  "bg-neutral-800",
  "bg-neutral-900",
  "bg-neutral-950",
  "bg-stone-50",
  "bg-stone-100",
  "bg-stone-200",
  "bg-stone-300",
  "bg-stone-400",
  "bg-stone-500",
  "bg-stone-600",
  "bg-stone-700",
  "bg-stone-800",
  "bg-stone-900",
  "bg-stone-950",
  "bg-red-50",
  "bg-red-100",
  "bg-red-200",
  "bg-red-300",
  "bg-red-400",
  "bg-red-500",
  "bg-red-600",
  "bg-red-700",
  "bg-red-800",
  "bg-red-900",
  "bg-red-950",
  "bg-orange-50",
  "bg-orange-100",
  "bg-orange-200",
  "bg-orange-30,950",
  "bg-yellow-50",
  "bg-yellow-100",
  "bg-yellow-200",
  "bg-yellow-300",
  "bg-yellow-400",
  "bg-yellow-500",
  "bg-yellow-600",
  "bg-yellow-700",
  "bg-yellow-800",
  "bg-yellow-900",
  "bg-yellow-950",
  "bg-lime-50",
  "bg-lime-100",
  "bg-lime-200",
  "bg-lime-300",
  "bg-lime-400",
  "bg-lime-500",
  "bg-emerald-200",
  "bg-emerald-300",
  "bg-emerald-400",
  "bg-emerald-500",
  "bg-emerald-600",
  "bg-emerald-700",
  "bg-emerald-800",
  "bg-emerald-900",
  "bg-emerald-950",
  "bg-teal-50",
  "bg-teal-100",
  "bg-teal-200",
  "bg-teal-300",
  "bg-teal-400",
  "text-purple-800",
  "text-purple-900",
  "text-purple-950",
  "text-fuchsia-50",
  "text-fuchsia-100",
  "text-fuchsia-200",
  "text-fuchsia-300",
  "text-fuchsia-400",
  "text-fuchsia-500",
  "text-fuchsia-600",
  "text-fuchsia-700",
  "text-fuchsia-800",
  "text-fuchsia-900",
  "text-fuchsia-950",
  "text-pink-50",
  "text-pink-100",
  "text-pink-200",
  "text-pink-300",
  "text-pink-400",
  "text-pink-500",
  "text-pink-600",
  "text-pink-700",
  "text-pink-800",
  "text-pink-900",
  "text-pink-950",
  "text-rose-50",
  "text-rose-100",
  "text-rose-200",
  "text-rose-300",
  "text-rose-400",
  "text-rose-500",
  "text-rose-600",
  "text-rose-700",
  "text-rose-800",
  "text-rose-900",
  "text-rose-950",
];

interface ColorSwatchProps {
  defaultColors?: string[];
  lockDefaultColors?: boolean;
  allowNull?: boolean;
  allowUserPreferences?: boolean;
  useGlobalPreferences?: boolean;
  allowTailwindColors?: boolean;
  tailwindColorWhitelist?: string[];
  allowHexColors?: boolean;
  overrides?: Partial<Omit<TextField, "name" | "type" | "hasMany" | "minRows" | "maxRows" | "validate">>;
}

type ColorSwatchField = ({
  defaultColors,
  lockDefaultColors,
  allowNull,
  allowUserPreferences,
  useGlobalPreferences,
  allowTailwindColors,
  tailwindColorWhitelist,
  allowHexColors,
  overrides,
}: ColorSwatchProps) => TextField;

// TO DO: Add Cell support for column sorting by color
export const colorSwatchField: ColorSwatchField = ({
  defaultColors = [],
  lockDefaultColors = true,
  allowNull = true,
  allowUserPreferences = true,
  useGlobalPreferences = true,
  allowTailwindColors = true,
  tailwindColorWhitelist = TAILWIND_COLORS,
  allowHexColors = true,
  overrides = {},
}) => {
  return {
    name: "color",
    type: "text",
    index: true,
    label: "Color",
    required: false,
    validate: (value: string | null | undefined) => {
      if (value == null) return true;
      if (typeof value !== "string") return "This field is required";
      if (allowHexColors && /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(value))
        return true;
      if (allowTailwindColors && tailwindColorWhitelist.includes(value))
        return true;
      return "This field is required";
    },
    ...(overrides),
    admin: {
      position: "sidebar",
      ...("admin" in overrides ? (overrides.admin as object) : {}),
      components: {
        Field: {
          clientProps: {
            defaultColors,
            lockDefaultColors,
            allowNull,
            allowUserPreferences,
            useGlobalPreferences,
            allowTailwindColors,
            tailwindColorWhitelist,
            allowHexColors,
          },
          path: "/fields/ColorSwatch/ColorSwatchComponent#ColorSwatchComponent",
        },
      },
    },
  };
};
