import React from 'react';

interface PdfViewerProps {
  url: string;
  onClose: () => void;
}

const PdfViewer = ({ url, onClose }: PdfViewerProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex flex-col">
      {/* Header with close button */}
      <div className="bg-white p-4 flex justify-between items-center shadow-md">
        <h2 className="font-medium text-lg">Document Preview</h2>
        <button
          onClick={onClose}
          className="bg-[#000] text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Close
        </button>
      </div>
      
      {/* PDF Viewer */}
      <div className="flex-1 w-full bg-gray-100">
        <iframe 
          src={`${url}#toolbar=1&view=FitH`} 
          className="w-full h-full"
          title="Document Preview"
        />
      </div>
    </div>
  );
};

export default PdfViewer;