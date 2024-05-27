import fs from "fs";
import path from "path";

const useImageStorage = (baseFolder: string) => {
  const saveImage = (
    folderName: string,
    fileName: string,
    fileBuffer: Buffer
  ): string => {
    const folderPath = path.join(baseFolder, folderName);

    // Create the folder if it doesn't exist
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // Define the file path
    const filePath = path.join(folderPath, fileName);

    // Write the file to the folder
    fs.writeFileSync(filePath, fileBuffer);

    return filePath;
  };

  return { saveImage };
};

export default useImageStorage;
