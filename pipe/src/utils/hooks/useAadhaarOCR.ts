import Tesseract from "tesseract.js";

const useAadhaarOCR = () => {
  const readAadhaarNumber = async (
    imageBuffer: Buffer
  ): Promise<string | null> => {
    try {
      const {
        data: { text },
      } = await Tesseract.recognize(imageBuffer, "eng");
      const aadhaarNumber = text.match(/\b\d{4}\s\d{4}\s\d{4}\b/);
      return aadhaarNumber ? aadhaarNumber[0] : null;
    } catch (error) {
      console.error("Error reading Aadhaar number:", error);
      return null;
    }
  };

  return { readAadhaarNumber };
};

export default useAadhaarOCR;
