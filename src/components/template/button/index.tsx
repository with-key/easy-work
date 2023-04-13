import { styled } from "@styles/stitches.config";
import { typoes } from "@styles/typos";

/**
 * @doc 공통 스타일 버튼
 *
 */
const BaseButton = styled("button", {
  borderRadius: 10,
  display: "flex",
  ai: "center",
  jc: "center",

  variants: {
    shape: {
      large: {
        height: 52,
        width: "100%",
        ...typoes.T17_700,
      },

      smallLong: {
        height: 40,
        width: 130,
      },
      small: {
        height: 40,
        width: 90,
      },
      smallShort: {
        height: 40,
        width: 70,
      },
    },
  },
});

/**
 * Basic Styled Buttons
 *
 */
const Primary = styled(BaseButton, {
  bc: "$blue500",
  color: "white",
});

const Secondary = styled(BaseButton, {
  bc: "$blue200",
  color: "$blue500",
});

const Unset = styled("button", {
  all: "unset",
});

export const StyledButtons = {
  Primary,
  Secondary,
  Unset,
};

/**
 * Dialog Styled Button
 *
 */

export const DialogButton = styled("button", {
  ...typoes.T17_700,
  height: 54,

  bc: "$blue500",
  color: "white",

  variants: {
    dir: {
      left: {
        borderRadius: "0 0 0 20px",
      },
      right: {
        borderRadius: "0 0 20px 0",
      },
    },

    size: {
      half: {
        width: 158,
      },
      full: {
        width: 316,
        borderRadius: "0 0 20px 20px",
      },
    },

    negative: {
      true: {
        bc: "$gary06",
        color: "white",
      },
    },
  },

  defaultVariants: {
    size: "half",
  },
});
