import React, { useState } from 'react';
import { X, Upload, FileSpreadsheet, AlertCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface FileUploadProps {
  onClose: () => void;
  onUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onClose, onUpload }) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { importData } = useData();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = async (files: File[]) => {
    const validFiles = files.filter(file => 
      file.type.includes('spreadsheet') || 
      file.type.includes('excel') || 
      file.name.endsWith('.xlsx') || 
      file.name.endsWith('.xls') || 
      file.name.endsWith('.csv')
    );

    if (validFiles.length === 0) {
      alert('Please select Excel or CSV files only.');
      return;
    }

    setUploading(true);
    try {
      for (const file of validFiles) {
        await importData(file);
        onUpload(file);
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Import Financial Data</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragOver ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
        >
          {uploading ? (
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
              <p className="text-gray-600">Uploading and processing...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <FileSpreadsheet className="h-12 w-12 text-gray-400 mx-auto" />
              <div>
                <p className="text-lg font-medium text-gray-900">
                  Drop your Excel or CSV files here
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  or click to browse
                </p>
              </div>
              <input
                type="file"
                multiple
                accept=".xlsx,.xls,.csv"
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer transition-colors"
              >
                <Upload className="h-4 w-4 mr-2" />
                Browse Files
              </label>
            </div>
          )}
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
            <div className="text-sm text-blue-700">
              <p className="font-medium">Supported formats:</p>
              <p>Excel files (.xlsx, .xls) and CSV files (.csv)</p>
              <p className="mt-1">Make sure your data follows the standard CFO dashboard format.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;