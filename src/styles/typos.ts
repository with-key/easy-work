type Typo = {
  fontWeight: number;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
};

type GenTypo = (fw: number, fs: number, lh: number, ls?: number) => Typo;

export const genTypo: GenTypo = (fw, fs, lh, ls = -0.2) => {
  return {
    fontWeight: fw,
    fontSize: `${fs}px`,
    lineHeight: `${lh}px`,
    letterSpacing: `${ls}px`,
  };
};

export const typoes = {
  T34_800: genTypo(800, 34, 35),
  T26_800: genTypo(800, 26, 35),
  T20_800: genTypo(800, 20, 30),
  T17_700: genTypo(700, 17, 24),
  T15_700: genTypo(700, 15, 23),
  T15_600: genTypo(600, 15, 23),
  T15_400: genTypo(400, 15, 23),
  T14_700: genTypo(700, 14, 22),
  T14_600: genTypo(600, 14, 22),
  T14_400: genTypo(400, 14, 22),
  T13_500: genTypo(500, 13, 22),
  T13_400: genTypo(400, 13, 22),
  T11_700: genTypo(700, 11, 14),
};
