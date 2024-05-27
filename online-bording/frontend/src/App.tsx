import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import Tesseract from 'tesseract.js';

const App = () => {
  const [aadhaarImage, setAadhaarImage] = useState(null);
  const [panImage, setPanImage] = useState(null);
  const [aadhaarUploaded, setAadhaarUploaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const webcamRef = useRef(null);

  const captureImage = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    await handleImage(imageSrc, 'camera');
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        await handleImage(reader.result, 'upload');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImage = async (imageSrc, sourceType) => {
    setErrorMessage(''); // Reset error message
    const result = await Tesseract.recognize(
      imageSrc,
      'eng+guj',
      {
        logger: (m) => console.log(m),
      }
    );

    const extractedText = result.data.text;
    console.log('Extracted Text:', extractedText);

    if (!aadhaarUploaded) {
      if (extractedText.includes('આધાર')) {
        setAadhaarImage(imageSrc);
        setErrorMessage('');
      } else {
        setErrorMessage('Required Aadhaar card.');
      }
    } else {
      if (extractedText.includes('Permanent Account Number Card')) {
        setPanImage(imageSrc);
        setErrorMessage('');
      } else {
        setErrorMessage('Required PAN card.');
      }
    }
  };

  const handleSubmit = async (type) => {
    const image = type === 'aadhaar' ? aadhaarImage : panImage;
    const response = await fetch('https://your-api-endpoint.com/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image }),
    });

    const result = await response.json();

    if (result.status) {
      if (type === 'aadhaar') {
        setAadhaarUploaded(true);
        setErrorMessage('');
      } else {
        setErrorMessage('');
        alert('PAN card uploaded successfully!');
      }
    } else {
      setErrorMessage('Error in uploading the image.');
    }
  };

  return (
    <div>
      <h1>Upload Aadhaar and PAN Card</h1>
      {!aadhaarUploaded && (
        <div>
          <h2>Upload Aadhaar Card Front Image</h2>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={320}
            height={240}
          />
          <button onClick={captureImage} style={{ backgroundColor: 'blue', color: 'white' }}>
            Capture Image
          </button>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {aadhaarImage && (
            <div>
              <img src={aadhaarImage} alt="Aadhaar Preview" style={{ width: '200px' }} />
              <button
                style={{ backgroundColor: 'blue', color: 'white' }}
                onClick={() => handleSubmit('aadhaar')}
              >
                Upload
              </button>
            </div>
          )}
        </div>
      )}

      {aadhaarUploaded && (
        <div>
          <h2>Upload PAN Card Front Image</h2>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={320}
            height={240}
          />
          <button onClick={captureImage} style={{ backgroundColor: 'blue', color: 'white' }}>
            Capture Image
          </button>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {panImage && (
            <div>
              <img src={panImage} alt="PAN Preview" style={{ width: '200px' }} />
              <button
                style={{ backgroundColor: 'blue', color: 'white' }}
                onClick={() => handleSubmit('pan')}
              >
                Upload
              </button>
            </div>
          )}
        </div>
      )}

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default App;
