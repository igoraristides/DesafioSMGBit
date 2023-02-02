import { IFileType } from "../components/FileUpload/FileUpload.types";
import Doc from "../assets/doc.png";
import Jpg from "../assets/jpg.png";
import Png from "../assets/png.png";
import Pdf from "../assets/pdf.png";
import Ppt from "../assets/ppt.png";
import Xls from "../assets/xls.png";
import Zip from "../assets/zip.png";

export const FileTypes: IFileType[] = [
  {
    filetype: "doc",
    fileImageName: Doc,
  },
  {
    filetype: "docx",
    fileImageName: Doc,
  },
  {
    filetype: "jpg",
    fileImageName: Jpg,
  },
  {
    filetype: "png",
    fileImageName: Png,
  },
  {
    filetype: "pdf",
    fileImageName: Pdf,
  },
  {
    filetype: "ppt",
    fileImageName: Ppt,
  },
  {
    filetype: "xls",
    fileImageName: Xls,
  },
  {
    filetype: "xlsx",
    fileImageName: Xls,
  },
  {
    filetype: "zip",
    fileImageName: Zip,
  },
];
