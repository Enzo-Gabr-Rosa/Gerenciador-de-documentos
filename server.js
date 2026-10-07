const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

const PORT = 3001;

const pastaPDFs = path.join(__dirname, 'public', 'pdfs');

if (!fs.existsSync(pastaPDFs)) {
  fs.mkdirSync(pastaPDFs, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, pastaPDFs);
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage,

  fileFilter: (req, file, cb) => {

    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Apenas arquivos PDF são permitidos.'));
    }

    cb(null, true);
  }
});


app.use((req, res, next) => {

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();

});


/* SERVIR OS PDFs */

app.use('/pdfs', express.static(pastaPDFs));


/* UPLOAD */

app.post('/upload', upload.single('arquivo'), (req, res) => {

  if (!req.file) {

    return res.status(400).json({
      erro: 'Nenhum arquivo foi enviado.'
    });

  }

  const arquivoURL =
    `http://localhost:3001/pdfs/${encodeURIComponent(req.file.filename)}`;

  res.status(201).json({

    nome: req.file.originalname,
    arquivoURL: arquivoURL

  });

});


app.listen(PORT, () => {

  console.log(
    `Servidor de upload rodando em http://localhost:${PORT}`
  );

});