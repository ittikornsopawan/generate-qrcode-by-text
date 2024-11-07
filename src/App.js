import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

function App() {
  const [text, setText] = useState('');
  const [qrValue, setQrValue] = useState('');
  const qrRef = useRef(null);

  // Handle text input change
  const handleTextChange = (e) => {
    setText(e.target.value);
    setQrValue(e.target.value); // Update QR code with new text or URL
  };

  // Copy QR code to clipboard
  const copyToClipboard = async () => {
    if (qrRef.current) {
      try {
        const canvas = qrRef.current.querySelector('canvas');
        const blob = await new Promise((resolve) => canvas.toBlob(resolve));
        const item = new ClipboardItem({ 'image/png': blob });
        await navigator.clipboard.write([item]);
        alert('QR code copied to clipboard!');
      } catch (error) {
        console.error('Failed to copy QR code: ', error);
        alert('Failed to copy QR code. Please try again.');
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>QR Code Generator</h1>

      <div style={{ marginBottom: '20px' }}>
        <label>
          Enter PDF URL or Text:
          <input
            type="text"
            value={text}
            onChange={handleTextChange}
            placeholder="Enter the URL or text"
            style={{ margin: '0 10px' }}
          />
        </label>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h2>Generated QR Code</h2>
        <div ref={qrRef}>
          {qrValue && (
            <QRCodeCanvas
              value={qrValue} // This will be the PDF URL or any text you entered
              size={256}
              renderAs="canvas"
            />
          )}
        </div>
        {qrValue && (
          <button onClick={copyToClipboard} style={{ marginTop: '20px' }}>
            Copy QR Code to Clipboard
          </button>
        )}
      </div>
    </div>
  );
}

export default App;