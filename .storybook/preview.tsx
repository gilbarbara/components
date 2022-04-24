import * as React from "react";
import { usePrevious } from "react-use";
import { ThemeProvider } from "@emotion/react";
import { useGlobals } from "@storybook/client-api";

import { FlexCenter } from "../src";
import { colors as themeColors } from "../src/modules/theme";
import { Theme } from "../src/types";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: {
    default: "white",
    values: [
      { name: "white", value: "#fff", default: true },
      { name: "light", value: "#f0f0f0" },
      { name: "gray", value: "#999" },
      { name: "dark", value: "#101010" }
    ]
  },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  layout: "centered",
  sidebar: {
    showRoots: true
  }
};

export const globalTypes = {
  appearance: {
    name: "Appearance",
    description: "Appearance for components",
    defaultValue: "light",
    toolbar: {
      icon: "mirror",
      items: ["light", "dark"]
    }
  },
  baseColor: {
    name: "Base color",
    description: "Base color for components",
    defaultValue: "primary",
    toolbar: {
      icon: "paintbrush",
      items: Object.keys(themeColors),
    }
  }
};

function WithThemeProvider(Story: React.FC, context: any) {
  const {
    globals: { appearance, baseColor }
  } = context;
  const previousAppearance = usePrevious(appearance);
  const [, updateGlobals] = useGlobals();
  const isDarkMode = appearance === "dark";

  if (previousAppearance !== appearance) {
    updateGlobals({ backgrounds: { value: appearance === "dark" ? "#101010" : "#fff" } });
  }

  return (
    <ThemeProvider
      theme={{
        darkMode: isDarkMode,
        colors: { primary: themeColors[baseColor as keyof Theme['colors']] },
      }}
    >
      <FlexCenter maxWidth={1024} style={{ color: isDarkMode ? "#fff" : "#101010" }} width="100%">
        <Story />
      </FlexCenter>
    </ThemeProvider>
  );
}

export const decorators = [WithThemeProvider];
