import express, { NextFunction, Request, Response } from "express";
import User from "../models/users";
import Admin from "../models/admin";
import { IUser } from "../types/Users";
import { IAdmin } from "../types/Admin";
import multer from "multer";
import useImageStorage from "../utils/hooks/useImageStore";
import useAadhaarOCR from "../utils/hooks/useAadhaarOCR";
import usePanOCR from "../utils/hooks/usePanOCR";
import useCaptcha from "../utils/hooks/useCaptcha";

const router = express.Router();

const upload = multer();
const { saveImage } = useImageStorage("uploads");

const { readAadhaarNumber } = useAadhaarOCR();
const { readPanNumber } = usePanOCR();
const { generateCaptcha } = useCaptcha();

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.post(
  "/create-user",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: IUser = req.body;
      const userId = data._id;
      if (userId) {
        const user = await User.findById(userId);
        if (user) {
          return res.status(400).json({
            message: "User already exists",
            status: false,
          });
        }
      }
      const user = new User(data);
      await user.save();

      res.status(200).json({
        message: "User created successfully",
        status: true,
        data: user,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", status: false });
      next(error);
    }
  }
);

router.post("/create-admin", async (req: Request, res: Response) => {
  try {
    const data: IAdmin = req.body;
    const adminId = data._id;
    if (adminId) {
      const admin = await Admin.findById(adminId);
      if (admin) {
        return res.status(400).json({
          message: "Admin already exists",
          status: false,
        });
      }
    }
    const admin = new Admin(data);
    await admin.save();

    res.status(200).json({
      message: "Admin created successfully",
      status: true,
      data: admin,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", status: false });
  }
});

router.post(
  "/upload",
  upload.single("image"),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        return res.status(400).send("No file uploaded.");
      }

      const folderName = "images";
      const fileName = req.file.originalname;
      const filePath = saveImage(folderName, fileName, req.file.buffer);

      res.send(`File saved to ${filePath}`);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/upload-aadhaar",
  upload.single("image"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        return res.status(400).send("No file uploaded.");
      }

      const aadhaarNumber = await readAadhaarNumber(req.file.buffer);

      if (aadhaarNumber) {
        res.send(`Aadhaar Number: ${aadhaarNumber}`);
      } else {
        res.send("Aadhaar number not found.");
      }
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/upload-pan",
  upload.single("image"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        return res.status(400).send("No file uploaded.");
      }

      const panNumber = await readPanNumber(req.file.buffer);

      if (panNumber) {
        res.send(`PAN Number: ${panNumber}`);
      } else {
        res.send("PAN number not found.");
      }
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/generate-captcha",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { captchaText, captchaImage } = await generateCaptcha();
      res.json({ captchaText, captchaImage });
    } catch (error) {
      next(error);
    }
  }
);

router.get("/users", async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const skip = (page - 1) * limit;

  try {
    const items = await User.find().skip(skip).limit(limit);
    const total = await User.countDocuments();

    res.json({
      items,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ error: "An error occurred while fetching items" });
  }
});

export default router;
