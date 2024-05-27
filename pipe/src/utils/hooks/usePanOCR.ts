import Tesseract from "tesseract.js";

const usePanOCR = () => {
  const readPanNumber = async (imageBuffer: Buffer): Promise<string | null> => {
    try {
      const {
        data: { text },
      } = await Tesseract.recognize(imageBuffer, "eng");
      const panNumber = text.match(/\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b/);
      return panNumber ? panNumber[0] : null;
    } catch (error) {
      console.error("Error reading PAN number:", error);
      return null;
    }
  };

  return { readPanNumber };
};

export default usePanOCR;
