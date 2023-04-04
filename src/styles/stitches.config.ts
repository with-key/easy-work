import { createStitches } from "@stitches/react";
import type * as Stitches from "@stitches/react";
import { colors } from "./colors";

export const {
  styled,
  css,
  keyframes,
  globalCss,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors,
    textStyle: {
      money01: "fontSize: 20",
    },
  },
  utils: {
    bc: (value: Stitches.PropertyValue<"backgroundColor">) => ({
      backgroundColor: value,
    }),
    br: (value: Stitches.PropertyValue<"borderRadius">) => ({
      borderRadius: value,
    }),
    mx: (value: string | number) => ({ marginLeft: value, marginRight: value }),
    my: (value: string | number) => ({ marginTop: value, marginBottom: value }),

    mt: (value: string | number) => ({ marginTop: value }),
    mb: (value: string | number) => ({ marginBottom: value }),

    px: (value: string | number) => ({
      paddingLeft: value,
      paddingRight: value,
    }),

    py: (value: string | number) => ({
      paddingTop: value,
      paddingBottom: value,
    }),

    pt: (paddingTop: string | number) => ({ paddingTop }),
    pb: (paddingBottom: string | number) => ({ paddingBottom }),

    jc: (justifyContent: Stitches.PropertyValue<"justifyContent">) => ({
      justifyContent,
    }),

    ai: (alignItems: Stitches.PropertyValue<"alignItems">) => ({
      alignItems,
    }),

    // REM margin X
    rmx: (v: number) => ({
      marginLeft: `${v / 16}rem`,
      marginRight: `${v / 16}rem`,
    }),
    rml: (v: number) => ({
      marginLeft: `${v / 16}rem`,
    }),
    rmr: (v: number) => ({
      marginRight: `${v / 16}rem`,
    }),

    // REM margin Y
    rmy: (v: number) => ({
      marginTop: `${v / 16}rem`,
      marginBottom: `${v / 16}rem`,
    }),
    rmb: (v: number) => ({
      marginBottom: `${v / 16}rem`,
    }),
    rmt: (v: number) => ({
      marginTop: `${v / 16}rem`,
    }),

    // REM padding X
    rpx: (v: number) => ({
      paddingLeft: `${v / 16}rem`,
      paddingRight: `${v / 16}rem`,
    }),
    rpl: (v: number) => ({
      paddingLeft: `${v / 16}rem`,
    }),
    rpr: (v: number) => ({
      paddingRight: `${v / 16}rem`,
    }),

    // REM padding Y
    rpy: (v: number) => ({
      paddingTop: `${v / 16}rem`,
      paddingBottom: `${v / 16}rem`,
    }),
    rpb: (v: number) => ({
      paddingBottom: `${v / 16}rem`,
    }),
    rpt: (v: number) => ({
      paddingTop: `${v / 16}rem`,
    }),

    // REM font-size
    rfs: (v: number) => ({
      fontSize: `${v / 16}rem`,
    }),

    rbr: (v: number) => ({
      borderRadius: `${v / 16}rem`,
    }),
  },
});

export type PresetColorType = keyof typeof colors;
export type StitchesCssType = Stitches.CSS<typeof config>;
