import * as multer from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import { fileStoragePath } from '../../utils/constant';

const storage = multer.diskStorage({
  // 自定义目录
  destination: function (req, file, cb) {
    // console.log('自定义目录', fileStoragePath);
    // 创建目录，如果目录不存在
    if (!fs.existsSync(fileStoragePath)) {
      fs.mkdirSync(fileStoragePath, { recursive: true });
    }
    cb(null, fileStoragePath);
  },
  // 自定义文件名称
  filename: function (req, file, cb) {
    // console.log('自定义文件名称', file);
    const suffix = path.extname(file.originalname);
    const name = Date.now() + suffix;
    cb(null, name);
  },
});
export { storage };
