"use client"
import FileUpload from "./component/FileUpload";
import React, { useState } from 'react';

// This is the main page of the app which will take Input of Pdf files also have Nice ui to get the file
export default function Home() {
  const [zipUrl, setZipUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    console.log(file)
    try {
      const formData = new FormData();
      formData.append('pdf', file);
      const response = await fetch('http://localhost:8000/parse_pdf', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const zipFile = await response.blob();
        const zipFileUrl = URL.createObjectURL(zipFile);
        setZipUrl(zipFileUrl);
        setIsLoading(false)
      } else {
        console.error('Failed to upload PDF file');
      }
    } catch (error) {
      console.error('Error uploading PDF file:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadZip = () => {
    if (zipUrl) {
      const a = document.createElement('a');
      a.href = zipUrl;
      a.download = 'result.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Upload PDF File</h1>
      <FileUpload onFileUpload={handleFileUpload} isLoading={isLoading} setLoading={setIsLoading}/>
      {zipUrl && (
        <button className="download-button" onClick={handleDownloadZip}>
          Download Result
        </button>
      )}
      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }
        .download-button {
          margin-top: 20px;
          padding: 10px 20px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .download-button:hover {
          background-color: #0056b3;
        }
        .download-button:active {
          background-color: #004080;
        }
      `}</style>
    </div>
  );
}
