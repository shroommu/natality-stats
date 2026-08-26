export const COLOR_TOKENS = {
  lightBlue: "#5597ed",
  lightPink: "#e356a5",
  lightPurple: "#6d52eb",
  darkBlue: "#1a3260",
  darkPink: "#571a41",
  darkPurple: "#2a1a5c",
  foreground: "#171717",
  white: "#ffffff",
} as const;

export const APP_BACKGROUND_GRADIENT = `linear-gradient(135deg, ${COLOR_TOKENS.lightBlue} 0%, ${COLOR_TOKENS.lightPink} 50%, ${COLOR_TOKENS.lightPurple} 100%)`;

export const APP_BACKGROUND_GRADIENT_DARK = `linear-gradient(135deg, ${COLOR_TOKENS.darkBlue} 0%, ${COLOR_TOKENS.darkPink} 50%, ${COLOR_TOKENS.darkPurple} 100%)`;
