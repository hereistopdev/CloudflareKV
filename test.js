const axios = require('axios');
const fs = require('fs');

// Function to measure the upload speed
async function testUploadSpeed(url, filePath) {
  try {
    const fileStream = fs.createReadStream(filePath);

    const startTime = Date.now();
    const response = await axios.post(url, fileStream);
    const endTime = Date.now();

    const uploadTime = endTime - startTime;
    const uploadSpeed = fileStream.bytesRead / uploadTime;

    console.log(`Upload Speed: ${uploadSpeed.toFixed(2)} bytes/ms`);
  } catch (error) {
    console.error('Error occurred during upload:', error);
  }
}

// Function to measure the download speed
async function testDownloadSpeed(url) {
  try {
    const startTime = Date.now();
    const response = await axios.get(url, { responseType: 'stream' });
    const endTime = Date.now();

    const downloadTime = endTime - startTime;
    const downloadSpeed = response.headers['content-length'] / downloadTime;

    console.log(`Download Speed: ${downloadSpeed.toFixed(2)} bytes/ms`);
  } catch (error) {
    console.error('Error occurred during download:', error);
  }
}

// Example usage
const uploadUrl = 'https://api.vermillion-vr.com/api/sync/upload'; // Replace with your actual upload URL
const downloadUrl = 'https://api.vermillion-vr.com/api/sync/download/1.txt'; // Replace with your actual download URL
const fileToUploadPath = 'path/to/file'; // Replace with the path to the file you want to upload

// testUploadSpeed(uploadUrl, fileToUploadPath);
testDownloadSpeed(downloadUrl);