// theme-config.ts

export const themeBackgrounds = {
  "dark-academia": 'url("/cozy.webp")',
  "coast": 'url("/coastd.jpg")',
  "cabin": 'url("/cabin.jpg")',
  // Add more themes as needed
};

// export const themeProperties = {
//   "dark-academia": {
//     textColor: "text-white",
//   },
//   "coast": {
//     textColor: "text-[#171717]",
//   },
//   // Add more themes as needed
// };

export type ThemeName = keyof typeof themeBackgrounds;
