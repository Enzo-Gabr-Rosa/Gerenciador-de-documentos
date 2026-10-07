# Gerenciador de Documentos

Sistema de gerenciamento de documentos desenvolvido com Ionic + Angular.

## Requisitos

* Node.js
* npm
* Ionic CLI

## Instalação

```bash
npm install
```

## Executando o projeto

É necessário iniciar **3 terminais**.

### Terminal 1 — JSON Server

```bash
cd ~/Documentos/Projetos/GestorDeDocumentos
npx json-server db.json --static public
```

Servidor:

```text
http://localhost:3000
```

### Terminal 2 — Servidor de Upload

```bash
cd ~/Documentos/Projetos/GestorDeDocumentos
node server.js
```

Servidor:

```text
http://localhost:3001
```

Responsável pelo upload dos PDFs.

### Terminal 3 — Ionic

```bash
cd ~/Documentos/Projetos/GestorDeDocumentos
ionic serve -- --proxy-config proxy.conf.json
```

Aplicação:

```text
http://localhost:8100
```

## Estrutura

```text
GestorDeDocumentos/
├── db.json
├── server.js
├── proxy.conf.json
├── public/
│   └── pdfs/
├── src/
└── package.json
```

## Servidores

| Porta  | Serviço                |
| ------ | ---------------------- |
| `3000` | JSON Server + arquivos |
| `3001` | Upload de PDFs         |
| `8100` | Ionic/Angular          |

## Fluxo do PDF

```text
Angular
   ↓
POST /upload :3001
   ↓
public/pdfs/
   ↓
JSON Server :3000
   ↓
ngx-extended-pdf-viewer
```

## Parar os servidores

Em cada terminal:

```text
Ctrl + C
```
