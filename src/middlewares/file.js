import multer from 'multer';
import multerConfig from '../config/multer.js';

const upload = multer(multerConfig).single('img');

export default {
  create(req, res, next) {
    return upload(req, res, () => {
      return next();
    });
  },
};
