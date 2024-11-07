import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

function App() {
  const [text, setText] = useState('');
  const [qrValue, setQrValue] = useState('');
  const qrRef = useRef(null);

  const handleTextChange = (e) => {
    setText(e.target.value);
    setQrValue(e.target.value);
  };

  const downloadQRCode = async () => {
    if (qrRef.current) {
      try {
        const canvas = qrRef.current.querySelector('canvas');
        const dataUrl = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'qr-code.png';
        link.click();
      } catch (error) {
        console.error('Failed to download QR code: ', error);
        alert('Failed to download QR code. Please try again.');
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>QR Code Generator</h1>

      <div style={{ marginBottom: '20px' }}>
        <label>
          Enter Text:
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
              value={qrValue}
              size={256}
              renderAs="canvas"
            />
          )}
        </div>
        {qrValue && (
          <button onClick={downloadQRCode} style={{ marginTop: '20px' }}>
            Download QR Code Image
          </button>
        )}
      </div>
    </div>
  );
}

export default App;