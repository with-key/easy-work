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
 * @doc Primary 스타일 버튼
 *
 */
export const Primary = styled(BaseButton, {
  bc: "$blue500",
  color: "white",
});
