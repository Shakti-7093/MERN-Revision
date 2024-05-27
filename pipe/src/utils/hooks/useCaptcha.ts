import { createCanvas } from "canvas";
import crypto from "crypto";
import useState from "./useState";

const [data, setData] = useState<string | null>(null);

const useCaptcha = () => {
  const generateCaptcha = () => {
    const width = 200;
    const height = 100;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // Generate random string
    const captchaText = crypto
      .randomBytes(3)
      .toString("hex")
      .slice(0, 6)
      .toUpperCase();

    // Background color
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, width, height);

    // Draw random lines
    for (let i = 0; i < 10; i++) {
      ctx.strokeStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
        Math.random() * 255
      })`;
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.lineTo(Math.random() * width, Math.random() * height);
      ctx.stroke();
    }

    // Text settings
    ctx.font = "48px serif";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(captchaText, width / 2, height / 2);

    // Distortion effect
    ctx.globalAlpha = 0.2;
    for (let i = 0; i < width; i++) {
      ctx.drawImage(
        canvas,
        i,
        0,
        1,
        height,
        i,
        Math.sin(i / 10) * 5,
        1,
        height
      );
    }

    console.log("captchaText ", captchaText);

    setData(captchaText);

    return {
      captchaText,
      captchaImage: canvas.toDataURL(),
    };
  };

  return { generateCaptcha };
};

console.log("data ", data);
const { generateCaptcha } = useCaptcha();
const captcha = generateCaptcha();
console.log("Generated Captcha:", captcha);
console.log("State data:", data);

export default useCaptcha;
