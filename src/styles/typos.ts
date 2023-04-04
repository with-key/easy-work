type Typo = {
  fontWeight: number;
  fontSize: string;
  lingHeight: string;
  letterSpacing: string;
};

type GenTypo = (fw: number, fs: number, lh: number, ls?: number) => Typo;

export const genTypo: GenTypo = (fw, fs, lh, ls = -0.2) => {
  return {
    fontWeight: fw,
    fontSize: `${fs}px`,
    lingHeight: `${lh}px`,
    letterSpacing: `${ls}px`,
  };
};

export const typoes: { [key: string]: Typo } = {
  "34-800": genTypo(800, 34, 35),
  "26-800": genTypo(800, 26, 35),
  "20-800": genTypo(800, 20, 30),
  "17-700": genTypo(700, 17, 24),
  "15-700": genTypo(700, 15, 23),
  "15-600": genTypo(600, 15, 23),
  "15-400": genTypo(400, 15, 23),
  "14-700": genTypo(700, 14, 22),
  "14-600": genTypo(600, 14, 22),
  "14-400": genTypo(400, 14, 22),
  "13-500": genTypo(500, 13, 22),
  "13-400": genTypo(400, 13, 22),
  "11-700": genTypo(700, 11, 14),
};
