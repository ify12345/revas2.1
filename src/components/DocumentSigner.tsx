/* eslint-disable @typescript-eslint/no-unused-vars */
// DocumentSigner.tsx
import React, { useState, useRef, useEffect } from 'react';

interface DocumentSignerProps {
  orderId: string;
  onSignatureSubmit: (signatureBlob: Blob) => Promise<void>;
}

interface SignatureUploadProps {
  onUpload: (blob: Blob) => void;
  isSubmitting: boolean;
}

interface SignaturePadProps {
  onSave: (blob: Blob) => void;
  isSubmitting: boolean;
}

const DocumentSigner: React.FC<DocumentSignerProps> = ({ orderId, onSignatureSubmit }) => {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' or 'draw'
  const [isSubmitting, setIsSubmitting] = useState(false);

interface HandleSignatureSubmit {
    (signatureBlob: Blob): Promise<void>;
}

const handleSignatureSubmit: HandleSignatureSubmit = async (signatureBlob) => {
    setIsSubmitting(true);

    try {
        await onSignatureSubmit(signatureBlob);
    } catch (error) {
        console.error('Error in DocumentSigner:', error);
    } finally {
        setIsSubmitting(false);    
    }
};

  return (
    <div className="document-signer w-full h-full flex flex-col">
      {/* Tab Navigation */}
      <div className="signature-options flex border-b border-gray-200 mb-6">
        <button 
          onClick={() => setActiveTab('upload')}
          className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'upload' 
              ? 'border-primary text-primary bg-blue-50' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Upload Signature
        </button>
        <button 
          onClick={() => setActiveTab('draw')}
          className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'draw' 
              ? 'border-primary text-primary bg-blue-50' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Draw Signature
        </button>
      </div>

      {/* Tab Content */}     
      <div className="signature-container flex-grow">
        {activeTab === 'upload' ? (
          <SignatureUpload onUpload={handleSignatureSubmit} isSubmitting={isSubmitting} />
        ) : (
          <SignaturePad onSave={handleSignatureSubmit} isSubmitting={isSubmitting} />
        )}
      </div>

      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span className="text-gray-600">Processing signature...</span>
          </div>
        </div>
      )}
    </div>
  );
};

// SignatureUpload component
const SignatureUpload: React.FC<SignatureUploadProps> = ({ onUpload, isSubmitting }) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image file (PNG, JPEG, JPG, or GIF)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        setPreview(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      alert('Please select a signature file first');
      return;
    }

    // Convert file to blob if needed
    const blob = selectedFile instanceof Blob ? selectedFile : new Blob([selectedFile]);
    onUpload(blob);
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreview(null);
  };

  return (
    <div className="signature-upload h-full flex flex-col">
      {!preview ? (
        <div
          className={`flex-grow border-2 border-dashed border-stroke rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-primary bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <p className="text-lg font-medium text-gray/90">Drop your signature here</p>
              <p className="text-sm text-gray-500 mt-1">or click to browse files</p>
            </div>
            <div className="text-xs text-gray/50">
              <p>Supported formats: PNG, JPEG, JPG, GIF</p>
              <p>Maximum file size: 5MB</p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
              id="signature-upload"
            />
            <label
              htmlFor="signature-upload"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
            >
              Choose File
            </label>
          </div>
        </div>
      ) : (
        <div className="flex-grow flex flex-col">
          <div className="flex-grow border border-gray rounded-lg p-4 bg-gray-50">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700 mb-4">Signature Preview</p>
              <div className="bg-white p-4 rounded border inline-block">
                <img 
                  src={preview} 
                  alt="Signature preview" 
                  className="max-w-full max-h-32 object-contain"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={clearSelection}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Choose Different File
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Signature'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// SignaturePad component
const SignaturePad: React.FC<SignaturePadProps> = ({ onSave, isSubmitting }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Set drawing styles
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Fill with white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (isSubmitting) return;
    
    setIsDrawing(true);
    setIsEmpty(false);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || isSubmitting) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (isSubmitting) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setIsEmpty(true);
  };

  const saveSignature = () => {
    if (isEmpty) {
      alert('Please draw your signature first');
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (blob) {
        onSave(blob);
      }
    }, 'image/png');
  };

  return (
    <div className="signature-pad h-full flex flex-col">
      <div className="flex-grow border border-gray rounded-lg bg-white p-4">
        <div className="text-center mb-4">
          <p className="text-sm font-medium text-gray">Draw your signature below</p>
          <p className="text-xs text-gray/40">Use your mouse or finger to sign</p>
        </div>
        
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="w-full h-48 border border-gray-300 rounded cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={(e) => {
              e.preventDefault();
              startDrawing(e);
            }}
            onTouchMove={(e) => {
              e.preventDefault();
              draw(e);
            }}
            onTouchEnd={(e) => {
              e.preventDefault();
              stopDrawing();
            }}
          />
          
          {isEmpty && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p className="text-gray-400 text-sm">Sign here</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={clearCanvas}
          disabled={isSubmitting || isEmpty}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Clear
        </button>
        <button
          onClick={saveSignature}
          disabled={isSubmitting || isEmpty}
          className="px-6 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Signature'}
        </button>
      </div>
    </div>
  );
};

export default DocumentSigner;