import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Settings from './Settings';
import logo from '../assets/Player13.png';
import logoWhite from '../assets/Player13_white.png';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [showSettings, setShowSettings] = useState(false);

  const handleWatchClick = () => {
    navigate('/watch', {
      state: {
        streamUrl: 'http://ky-tv.cc:80/XTV1313XTV/XTV1313XTV/516261.m3u8',
        channelName: 'Live Stream',
        category: 'IPTV Channel'
      }
    });
  };

  return (
    <div className={`flex h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-950' : 'bg-[#F5F5F7]'
    }`}>
      {/* Settings Modal */}
      <Settings isOpen={showSettings} onClose={() => setShowSettings(false)} />
      
      {/* Sidebar */}
      <aside className={`w-[220px] flex flex-col py-8 px-4 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900 border-r border-gray-800' : 'bg-white'
      }`}>
        <div className="mb-8 px-4 flex items-center justify-center">
          <img src={isDarkMode ? logoWhite : logo} alt="Player13 Logo" className="h-10 w-auto" />
        </div>

        <nav className="flex-1">
          <div className="mb-6">
            <p className={`text-xs uppercase tracking-wide mb-3 px-4 ${
              isDarkMode ? 'text-gray-500' : 'text-gray-400'
            }`}>Menu</p>
            <button className={`w-full flex items-center gap-3 px-4 py-2.5 transition-colors border-l-4 border-transparent hover:border-[#E50914] ${
              isDarkMode 
                ? 'text-gray-300 hover:text-[#E50914] hover:bg-gray-800' 
                : 'text-gray-600 hover:text-[#E50914] hover:bg-gray-50'
            }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="font-medium">Home</span>
            </button>
            <button className={`w-full flex items-center gap-3 px-4 py-2.5 transition-colors border-l-4 border-transparent hover:border-[#E50914] ${
              isDarkMode 
                ? 'text-gray-300 hover:text-[#E50914] hover:bg-gray-800' 
                : 'text-gray-600 hover:text-[#E50914] hover:bg-gray-50'
            }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span className="font-medium">Channels</span>
            </button>
            <button className={`w-full flex items-center gap-3 px-4 py-2.5 transition-colors border-l-4 border-transparent hover:border-[#E50914] ${
              isDarkMode 
                ? 'text-gray-300 hover:text-[#E50914] hover:bg-gray-800' 
                : 'text-gray-600 hover:text-[#E50914] hover:bg-gray-50'
            }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              <span className="font-medium">Live TV</span>
            </button>
          </div>

          <div>
            <p className={`text-xs uppercase tracking-wide mb-3 px-4 ${
              isDarkMode ? 'text-gray-500' : 'text-gray-400'
            }`}>Library</p>
            <button className={`w-full flex items-center gap-3 px-4 py-2.5 transition-colors border-l-4 border-transparent hover:border-[#E50914] ${
              isDarkMode 
                ? 'text-gray-300 hover:text-[#E50914] hover:bg-gray-800' 
                : 'text-gray-600 hover:text-[#E50914] hover:bg-gray-50'
            }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              <span className="font-medium">Favorites</span>
            </button>
            <button className={`w-full flex items-center gap-3 px-4 py-2.5 transition-colors border-l-4 border-transparent hover:border-[#E50914] ${
              isDarkMode 
                ? 'text-gray-300 hover:text-[#E50914] hover:bg-gray-800' 
                : 'text-gray-600 hover:text-[#E50914] hover:bg-gray-50'
            }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">Recent</span>
            </button>
          </div>
        </nav>

        <div className={`pt-4 border-t ${
          isDarkMode ? 'border-gray-800' : 'border-gray-100'
        }`}>
          <button 
            onClick={() => setShowSettings(true)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 transition-colors ${
              isDarkMode 
                ? 'text-gray-300 hover:text-[#E50914] hover:bg-gray-800' 
                : 'text-gray-600 hover:text-[#E50914] hover:bg-gray-50'
            }`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-medium">Settings</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-12">
          {/* Header */}
          <div className="mb-12">
            <h2 className={`text-3xl font-bold mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>Welcome Back</h2>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
              Continue watching your favorite channels
            </p>
          </div>

          {/* Hero Card */}
          <div className={`rounded-2xl shadow-md overflow-hidden mb-8 h-[320px] flex items-end relative transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-900' : 'bg-white'
          }`}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="relative z-10 p-8">
              <h3 className="text-3xl font-bold text-white mb-2">Start Watching</h3>
              <p className="text-white/90 mb-6">Browse channels and enjoy your content</p>
              <button 
                onClick={handleWatchClick}
                className="bg-[#E50914] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#c50812] transition-colors shadow-lg"
              >
                Browse Channels
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-6">
            <button 
              onClick={handleWatchClick}
              className={`rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300 text-left ${
                isDarkMode ? 'bg-gray-900 hover:bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="w-12 h-12 bg-[#E50914]/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#E50914]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Live TV</h4>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Watch live broadcasts</p>
            </button>

            <div className={`rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300 ${
              isDarkMode ? 'bg-gray-900 hover:bg-gray-800' : 'bg-white'
            }`}>
              <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Categories</h4>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Browse by genre</p>
            </div>

            <div className={`rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300 ${
              isDarkMode ? 'bg-gray-900 hover:bg-gray-800' : 'bg-white'
            }`}>
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Search</h4>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Find your content</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeScreen;
