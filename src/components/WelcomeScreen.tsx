import React, { useState, useEffect } from 'react';
import logo from '../assets/Player13.png';

const WelcomeScreen: React.FC = () => {
  const [secretCode, setSecretCode] = useState('');

  // Generate time-based secret code
  useEffect(() => {
    const generateSecretCode = () => {
      const timestamp = Date.now();
      const hash = timestamp.toString(36).toUpperCase();
      const code = `${hash.slice(0, 4)}-${hash.slice(4, 8)}-${hash.slice(8, 12)}`;
      setSecretCode(code);
    };

    generateSecretCode();
    const interval = setInterval(generateSecretCode, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Dummy MAC address
  const macAddress = 'AA:BB:CC:DD:EE:FF';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex h-screen bg-[#F5F5F7]">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src={logo} alt="Player13 Logo" className="h-16 w-auto" />
          </div>

          {/* Welcome Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Player13</h1>
              <p className="text-gray-500">Activate your device to get started</p>
            </div>

            {/* Activation Info */}
            <div className="space-y-6">
              {/* MAC Address Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Device MAC Address
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                    <p className="text-gray-900 font-mono text-center text-lg">
                      {macAddress}
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(macAddress)}
                    className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    title="Copy MAC Address"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Secret Code Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Activation Code
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                    <p className="text-gray-900 font-mono text-center text-lg">
                      {secretCode}
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(secretCode)}
                    className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    title="Copy Activation Code"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm text-blue-900 font-medium mb-1">How to activate</p>
                    <p className="text-sm text-blue-700">
                      Share these credentials with your service provider to activate your device and start streaming.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full bg-[#E50914] text-white py-3 rounded-lg font-medium hover:bg-[#c50812] transition-colors shadow-md">
                Continue to Setup
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Need help? Contact support
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
