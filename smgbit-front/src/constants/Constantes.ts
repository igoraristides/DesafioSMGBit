import { ITiposArquivos } from '../components/UploadArquivo/UploadArquivo.types';
import Doc from '../assets/doc.png';
import Jpg from '../assets/jpg.png';
import Png from '../assets/png.png';
import Pdf from '../assets/pdf.png';
import Ppt from '../assets/ppt.png';
import Xls from '../assets/xls.png';
import Zip from '../assets/zip.png';

export const TiposDeArquivos: ITiposArquivos[] = [
  {
    tipoArquivo: 'doc',
    pathTipoArquivo: Doc,
  },
  {
    tipoArquivo: 'docx',
    pathTipoArquivo: Doc,
  },
  {
    tipoArquivo: 'jpg',
    pathTipoArquivo: Jpg,
  },
  {
    tipoArquivo: 'png',
    pathTipoArquivo: Png,
  },
  {
    tipoArquivo: 'pdf',
    pathTipoArquivo: Pdf,
  },
  {
    tipoArquivo: 'ppt',
    pathTipoArquivo: Ppt,
  },
  {
    tipoArquivo: 'xls',
    pathTipoArquivo: Xls,
  },
  {
    tipoArquivo: 'xlsx',
    pathTipoArquivo: Xls,
  },
  {
    tipoArquivo: 'zip',
    pathTipoArquivo: Zip,
  },
];

export const TiposArquivosPermitidos = '.doc, .docx, .jpg, .png, .pdf, .ppt, .xlx, .xlsx, .zip';
