// src/components/confetti.js

/**
 * Premium SVG confetti generator (stars, hearts, coins)
 * Usage: createConfetti({ particleCount, spread, origin })
 */
export const createConfetti = ({
  particleCount = 120,
  spread = 110,
  origin = { y: 0.55 }
} = {}) => {
  if (typeof window === "undefined") return;

  const shapes = [
    ["star", "#fecaca"], // soft red
    ["heart", "#fbcfe8"], // pink
    ["circle", "#bbf7d0"], // green
    ["coin", "#fde68a"], // yellow
  ];

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const size = 12;

  shapes.forEach(([shape, color]) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    switch (shape) {
      case "star":
        for (let i = 0; i < 5; i++) {
          const angle = (i * 2 * Math.PI) / 5;
          const x = Math.cos(angle) * size + size;
          const y = Math.sin(angle) * size + size;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        break;
      case "heart":
        ctx.moveTo(size, size + 4);
        ctx.bezierCurveTo(size + 8, size - 8, size + 16, size + 8, size, size + 20);
        ctx.bezierCurveTo(size - 16, size + 8, size - 8, size - 8, size, size + 4);
        break;
      case "circle":
      default:
        ctx.arc(size, size, size, 0, 2 * Math.PI);
    }
    ctx.fill();
  });
};
