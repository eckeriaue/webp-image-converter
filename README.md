# 🌄 WebP Image Converter API

A high-performance image conversion service that transforms images to modern WebP format. Perfect for optimizing web assets!

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![Docker Image](https://img.shields.io/docker/v/yourusername/webp-converter/latest)](https://hub.docker.com/r/yourusername/webp-converter)

## 🚀 Features
- Convert multiple image formats to WebP
- Adjust output quality on-the-fly
- RESTful API interface
- Docker-ready configuration
- Environment-based customization

## 📚 API Endpoints

### 🔄 Convert Image to WebP
**POST** `/api/convert`
```bash
curl -X POST -F "image=@input.jpg" http://localhost:3000/api/convert
```
### 🛠️ Getting Started
Prerequisites

    Node.js 18+

    Docker 20.10+ (optional)

### Local Installation
```bash
git clone https://github.com/eckeriaue/webp-image-converter.git
cd webp-image-converter
npm install
cp .env.example .env
npm run dev:env
```

### Docker Setup
```bash
docker build -t webp-converter .
docker run -p 3000:3000 -d webp-converter
```

### Configuration (.env)
```ini
HOST=0.0.0.0
PORT=3000
MAX_FILE_SIZE=5MB
DEFAULT_QUALITY=85
```

### 🤝 Contributing

    Fork the repository

    Create your feature branch (git checkout -b feature/amazing-feature)

    Commit changes (git commit -m 'Add some amazing feature')

    Push to branch (git push origin feature/amazing-feature)

    Open a Pull Request