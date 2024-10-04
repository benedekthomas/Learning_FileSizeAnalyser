const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Function to scan files in a directory
function scanDirectory(directoryPath) {
  const files = fs.readdirSync(directoryPath);

  return files.map(file => {
    const filePath = path.join(directoryPath, file);
    const stats = fs.statSync(filePath);

    return {
      name: file,
      type: stats.isDirectory() ? 'folder' : 'file',
      size: stats.size // File size in bytes
    };
  });
}

// API route to scan files
app.get('/api/files', (req, res) => {
  const directoryPath = path.join(__dirname, '../files'); // Replace 'files' with your directory

  try {
    const fileList = scanDirectory(directoryPath);
    res.json(fileList);
  } catch (error) {
    res.status(500).send('Error scanning directory');
  }
});

// Serve frontend (optional)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
