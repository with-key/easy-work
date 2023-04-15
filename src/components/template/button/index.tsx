import { styled } from "@styles/stitches.config";
import { typoes } from "@styles/typos";

/**
 * @doc 공통 스타일 버튼
 *
 */
const BaseButton = styled("button", {
  display: "flex",
  ai: "center",
  jc: "center",

  variants: {
    shape: {
      big01: {
        height: 60,
        width: "100%",
        ...typoes.T17_700,
      },

      big02: {
        height: 52,
        width: "100%",
        ...typoes.T17_700,
        borderRadius: 10,
      },

      big01Half: {
        height: 60,
        width: 188,
        ...typoes.T17_700,
      },

      big02Half: {
        height: 52,
        width: 153,
        ...typoes.T17_700,
        borderRadius: 7,
      },

      middle: {
        ...typoes.T14_600,
        height: 40,
        width: 271,
        borderRadius: 10,
      },

      small01: {
        ...typoes.T14_600,
        height: 40,
        width: 130,
        borderRadius: 10,
      },

      small02: {
        ...typoes.T14_600,
        height: 40,
        width: 90,
        borderRadius: 10,
      },

      small03: {
        ...typoes.T14_600,
        height: 40,
        width: 70,
        borderRadius: 10,
      },
    },
  },

  defaultVariants: {
    shape: "big01",
  },
});

/**
 * Basic Styled Buttons
 *
 */
const Primary = styled(BaseButton, {
  bc: "$blue500",
  color: "white",

  "&:active": {
    bc: "$blue600",
  },

  "&:disabled": {
    bc: "$gary05",
  },
});

const Secondary = styled(BaseButton, {
  bc: "$blue200",
  color: "$blue500",

  "&:active": {
    bc: "$blue300",
  },

  "&:disabled": {
    bc: "$gary03",
  },
});

const Reject = styled(BaseButton, {
  bc: "$gary06",
  color: "white",

  "&:active": {
    bc: "$gary07",
  },

  "&:disabled": {
    bc: "$gary03",
    color: "$gary06",
  },
});

const Unset = styled("button", {
  all: "unset",
});

export const StyledButtons = {
  Primary,
  Secondary,
  Reject,
  Unset,
};

/**
 * Dialog Styled Button
 *
 */
export const StyledDialogButton = styled("button", {
  ...typoes.T17_700,
  height: 54,

  bc: "$blue500",
  color: "white",

  "&:active": {
    bc: "$blue600",
  },

  "&:disabled": {
    bc: "$gary05",
  },

  variants: {
    dir: {
      left: {
        borderRadius: "0 0 0 20px",
      },
      right: {
        borderRadius: "0 0 20px 0",
      },
    },

    shape: {
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

        "&:active": {
          bc: "$gary07",
        },

        "&:disabled": {
          bc: "$gary03",
        },
      },
    },
  },

  defaultVariants: {
    shape: "half",
    dir: "left",
  },
});
