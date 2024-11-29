"use client";

import {
  Button,
  FieldLabel, // Re-use the built in Label component directly from Payload
  useField,
  usePreferences,
} from "@payloadcms/ui";

import type { TextFieldClientProps } from "payload";
import React, { Fragment, useCallback, useEffect, useState } from "react";

import "./styles-tailwind.css"; // TO DO: Only load this if tailwind is enabled?
import "./index.css";

const baseClass = "color-swatch-field";

type ColorSwatchProps = {
  readonly defaultColors: string[];
  readonly lockDefaultColors: boolean;
  readonly allowNull: boolean;
  readonly allowUserPreferences: boolean;
  readonly useGlobalPreferences: boolean;
  readonly allowTailwindColors: boolean;
  readonly tailwindColorWhitelist: string[];
  readonly allowHexColors: boolean;
} & TextFieldClientProps;

function isTailwindColor(
  color: string,
  tailwindColorWhitelist: string[],
): boolean {
  return !!color && tailwindColorWhitelist.includes(color);
}

export const ColorSwatchComponent: React.FC<ColorSwatchProps> = ({
  defaultColors,
  lockDefaultColors,
  allowNull,
  allowUserPreferences,
  useGlobalPreferences,
  allowTailwindColors,
  tailwindColorWhitelist,
  allowHexColors,
  field,
  path,
}) => {
  const { label } = field;

  const { value = "", setValue } = useField({ path });

  const defaultPreferenceKey = (useGlobalPreferences ? "" : `${field.name}-`) + "default-color-swatch-colors";
  const customPreferenceKey = (useGlobalPreferences ? "" : `${field.name}-`) + "custom-color-swatch-colors";

  const { getPreference, setPreference } = usePreferences();

  const [defaultColorOptions, setDefaultColorOptions] = useState([
    allowNull && null, // default options will include an array of null (if configured)
    ...defaultColors.filter((element: string) => {
      // Filter any user input to ensure they're proper values
      return (
        (allowHexColors && element.startsWith("#")) || // If hex value
        (allowTailwindColors &&
          isTailwindColor(element, tailwindColorWhitelist)) // If a tailwind color
      );
    }),
  ]);
  const [customColorOptions, setCustomColorOptions] = useState<string[]>([]);

  const [isAdding, setIsAdding] = useState(false);
  const [colorToAdd, setColorToAdd] = useState("");
  const [selectedTailwindColor, setSelectedTailwindColor] = useState("");

  useEffect(() => {
    if (allowUserPreferences) {
      // If custom colors are allowed, then get the user's color preferences
      const getColorPreferences = async () => {
        if (!lockDefaultColors) {
          const defaultColorPreferences =
            await getPreference<string[]>(defaultPreferenceKey);

          if (
            defaultColorPreferences &&
            defaultColorPreferences !== undefined &&
            defaultColorPreferences.length != 0
          ) {
            setDefaultColorOptions(defaultColorPreferences);
          }
        }

        const customColorPreferences =
          await getPreference<string[]>(customPreferenceKey);

        if (
          customColorPreferences &&
          customColorPreferences !== undefined &&
          customColorPreferences.length != 0
        ) {
          setCustomColorOptions(customColorPreferences);
        }
      };

      getColorPreferences();
    }
  }, []);

  const handleAddColor = useCallback(() => {
    // This can only run when 'allowUserPreferences' is true
    setIsAdding(false);
    setValue(colorToAdd);

    // Prevent adding duplicates
    if (customColorOptions.indexOf(colorToAdd) > -1) return;

    // Add the color
    const newOptions = customColorOptions;
    newOptions.push(colorToAdd);

    // Update state with new colors
    setCustomColorOptions(newOptions);

    // Store the user color preferences for future use
    setPreference(customPreferenceKey, newOptions);
  }, [value, colorToAdd, customColorOptions, setPreference]);

  const handleRemoveColor = useCallback(() => {
    if (!lockDefaultColors && defaultColorOptions.includes(value as string)) {
      // Remove the color
      const newOptions = defaultColorOptions.filter((color) => {
        return color !== value;
      });

      // Update state with new colors
      setDefaultColorOptions(newOptions);

      // Store the user color preferences for future use
      setPreference(defaultPreferenceKey, newOptions);
    } else {
      // Remove the color
      const newOptions = customColorOptions.filter((color) => {
        return color !== value;
      });

      // Update state with new colors
      setCustomColorOptions(newOptions);

      // Store the user color preferences for future use
      setPreference(customPreferenceKey, newOptions);
    }

    setValue("");
  }, [value, defaultColorOptions, customColorOptions, setPreference]);

  const showRemoveButton: boolean =
    !!value && // Display remove color button
    allowUserPreferences && // If custom colors are allowed
    ((lockDefaultColors && !defaultColors.includes(value as string)) ||
      !lockDefaultColors); // If value isn't in default colors, and default colors are locked

  return (
    <div className={baseClass}>
      <FieldLabel htmlFor={path} label={label} />

      {isAdding && (
        <div>
          {allowTailwindColors && (
            <>
              <select
                value={selectedTailwindColor}
                onChange={(e) => {
                  setSelectedTailwindColor(e.target.value);
                  setColorToAdd(e.target.value);
                }}
              >
                <option value="" key="tailwind-colors-all">
                  Tailwind color
                </option>
                {tailwindColorWhitelist.map((color, i) => (
                  <option value={color} key={i} className={color}>
                    {color}
                  </option>
                ))}
              </select>
              &nbsp;
            </>
          )}
          {allowHexColors && (
            <input
              className="max-w-24"
              type="text"
              placeholder="#000000"
              onChange={(e) => {
                setSelectedTailwindColor("");
                setColorToAdd(e.target.value);
              }}
              value={colorToAdd}
            />
          )}
          <br />
          <Button
            buttonStyle="primary"
            iconPosition="left"
            iconStyle="with-border"
            size="small"
            onClick={handleAddColor}
          >
            Add
          </Button>
          &nbsp;
          <Button
            buttonStyle="secondary"
            iconPosition="left"
            iconStyle="with-border"
            size="small"
            onClick={() => setIsAdding(false)}
          >
            Cancel
          </Button>
        </div>
      )}
      {!isAdding && (
        <Fragment>
          <ul className="flex flex-wrap list-none p-0 m-0">
            {defaultColorOptions.map((color, i) => (
              <li key={i}>
                <button
                  type="button"
                  key={color ? color : "transparent"}
                  className={`chip ${!color ? "no-color" : ""} ${
                    color === value ? "chip--selected" : ""
                  } ${
                    color &&
                    isTailwindColor(color, tailwindColorWhitelist) &&
                    color
                  } chip--clickable`}
                  style={
                    // Hex values should be inline background
                    {
                      backgroundColor: (color && color.startsWith("#")) ? color : undefined,
                    }
                  }
                  onClick={() => setValue(color)}
                  title={color || undefined}
                >
                  {
                    color &&
                      !color.startsWith("#") &&
                      String.fromCharCode(65 + i) + String.fromCharCode(97 + i) // Generate Alphanumeric text
                  }
                </button>
              </li>
            ))}
            {allowUserPreferences && customColorOptions.length > 0 && (
              <>
                <li className="mx-4 my-2 h-8 w-px border-l border-solid border-[#aaa]" />
                {customColorOptions.map((color, i) => (
                  <li key={i} className={`${baseClass}__color-custom`}>
                    <button
                      type="button"
                      key={color ? color : "transparent"}
                      // eslint-disable-next-line max-len
                      className={`relative m-1 size-10 cursor-pointer rounded-full border border-transparent shadow-[0_0_4px_rgba(0,0,0,0.5)] ${!color ? "bg-white" : ""} ${color === value ? "border-white shadow-[0_0_8px_rgba(0,0,0,0.5)]" : ""} ${color && isTailwindColor(color, tailwindColorWhitelist) ? color : ""}`}
                      style={
                        // Hex values should be inline background
                        {
                          backgroundColor:
                            (color && color.startsWith("#")) ? color : undefined,
                        }
                      }
                      onClick={() => setValue(color)}
                      title={color && color}
                    >
                      {color &&
                        !color.startsWith("#") &&
                        String.fromCharCode(
                          // Generate Alphanumeric text
                          65 + i + defaultColorOptions.length + 1,
                        ) +
                          String.fromCharCode(
                            97 + i + defaultColorOptions.length + 1,
                          )}
                    </button>
                  </li>
                ))}
              </>
            )}
          </ul>
          {allowUserPreferences && (
            <Button
              className="m-1 size-8 p-0"
              icon="plus"
              tooltip="Add color"
              buttonStyle="icon-label"
              iconPosition="left"
              iconStyle="with-border"
              onClick={() => {
                setIsAdding(true);
                setValue("");
              }}
            />
          )}
          {showRemoveButton && (
            <Button
              className="m-1 size-8 p-0"
              icon="x"
              tooltip="Remove color"
              buttonStyle="icon-label"
              iconPosition="left"
              iconStyle="with-border"
              onClick={handleRemoveColor}
            />
          )}
        </Fragment>
      )}
    </div>
  );
};
