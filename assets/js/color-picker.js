/*------------------------------------------
    1. HEX → RGB convert helper
-------------------------------------------*/
function hexToRgb(hex) {
  hex = hex.replace("#", "");
  if (hex.length === 3)
    hex = hex
      .split("")
      .map((x) => x + x)
      .join("");
  const num = parseInt(hex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}
/*------------------------------------------
    2. Generate opacity variants & CSS classes
-------------------------------------------*/
const mainColors = [
  "brand",
  "white",
  "black",
  "blue",
  "warning",
  "yellow",
  "neon",
  "orange",
  "indigo",
  "purple",
  "brand-secondary",
];
const root = document.documentElement;
const styleTag = document.createElement("style");
document.head.appendChild(styleTag);

let cssRules = "";

mainColors.forEach((name) => {
  const baseHex = getComputedStyle(root).getPropertyValue(`--${name}`).trim();
  const rgb = hexToRgb(baseHex);

  // generate opacity variants: 5%, 10%, ... 100%
  for (let i = 1; i <= 20; i++) {
    const opacity = i * 0.05; // 0.05 → 1.0
    const percent = i * 5; // 5, 10, 15, ... 100
    const varName = `--${name}-${percent}`;
    const rgba = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;

    root.style.setProperty(varName, rgba);
    cssRules += `
      .bg-${name}-${percent} { background-color: var(${varName}) !important; }
      .text-${name}-${percent} { color: var(${varName}) !important; }
      .border-${name}-${percent} { border-color: var(${varName}) !important; }

      /* hover variants */
      .hover\\:bg-${name}-${percent}:hover { background-color: var(${varName}) !important; }
      .hover\\:text-${name}-${percent}:hover { color: var(${varName}) !important; }
      .hover\\:border-${name}-${percent}:hover { border-color: var(${varName}) !important; }
    `;
  }
});

styleTag.innerHTML = cssRules;
