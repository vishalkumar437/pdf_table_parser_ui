// components/FileUpload.tsx
import React, { useState } from 'react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  isLoading: boolean,
  setLoading: any
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, isLoading, setLoading }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setLoading(true);
      onFileUpload(file);
    }
  };

  return (
    <div className={`file-upload-container ${isLoading ? 'blurred' : ''}`}>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="fileInput"
      />
      <label htmlFor="fileInput" className="file-upload-label">
        {isLoading ? 'Uploading...' : selectedFile ? selectedFile.name : 'Choose a PDF file'}
      </label>
      <button
        className="upload-button"
        onClick={() => {
          const input = document.getElementById('fileInput');
          if (input) input.click();
        }}
        disabled={isLoading}
      >
        Upload
      </button>
      {isLoading && <div className="loader"></div>}
      <style jsx>{`
        .file-upload-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 20px;
        }
        .file-upload-container.blurred {
          backdrop-filter: blur(5px);
        }
        .file-upload-label {
          padding: 10px 20px;
          background-color: #f0f0f0;
          border: 1px solid #ddd;
          border-radius: 5px;
          cursor: pointer;
        }
        .upload-button {
          margin-top: 10px;
          padding: 10px 20px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .upload-button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        .upload-button:hover {
          background-color: #0056b3;
        }
        .upload-button:active {
          background-color: #004080;
        }
        .loader {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-top: 4px solid #333;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          animation: spin 1s linear infinite;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default FileUpload;
