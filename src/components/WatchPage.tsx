import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import Settings from './Settings';
import VideoPlayer from './VideoPlayer';
import logo from '../assets/Player13.png';
import logoWhite from '../assets/Player13_white.png';

interface WatchPageProps {
  streamUrl?: string;
  channelName?: string;
  channelLogo?: string;
  category?: string;
}

const WatchPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { streamUrl, channelName, channelLogo, category } = (location.state || {}) as WatchPageProps;
  const { isDarkMode } = useTheme();
  
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const defaultStreamUrl = "http://ky-tv.cc:80/XTV1313XTV/XTV1313XTV/516261.m3u8";

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      {/* Settings Modal */}
      <Settings isOpen={showSettings} onClose={() => setShowSettings(false)} />
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 ease-out shadow-2xl w-[260px] ${
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        } ${isDarkMode ? 'bg-gray-900 border-r border-gray-800' : 'bg-white'}`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className={`p-6 border-b ${
            isDarkMode ? 'border-gray-800' : 'border-gray-100'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <img src={isDarkMode ? logoWhite : logo} alt="Player13" className="h-8 w-auto" />
              <button
                onClick={() => setShowSidebar(false)}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                }`}
                aria-label="Close sidebar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              <button 
                onClick={() => navigate('/')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-[#E50914] hover:bg-gray-800' 
                    : 'text-gray-700 hover:text-[#E50914] hover:bg-gray-50'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="font-medium">Home</span>
              </button>

              <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-[#E50914] hover:bg-gray-800' 
                  : 'text-gray-700 hover:text-[#E50914] hover:bg-gray-50'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span className="font-medium">All Channels</span>
              </button>

              <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-[#E50914] hover:bg-gray-800' 
                  : 'text-gray-700 hover:text-[#E50914] hover:bg-gray-50'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                <span className="font-medium">Favorites</span>
              </button>

              <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-[#E50914] hover:bg-gray-800' 
                  : 'text-gray-700 hover:text-[#E50914] hover:bg-gray-50'
              }`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">Recent</span>
              </button>
            </div>

            {/* Channel Info Section */}
            {channelName && (
              <div className={`mt-6 p-4 rounded-xl ${
                isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'
              }`}>
                <p className={`text-xs uppercase tracking-wide mb-2 ${
                  isDarkMode ? 'text-gray-500' : 'text-gray-500'
                }`}>Now Playing</p>
                <div className="flex items-start gap-3">
                  {channelLogo && (
                    <img src={channelLogo} alt={channelName} className="w-12 h-12 rounded-lg object-cover" />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold truncate ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>{channelName}</h3>
                    {category && (
                      <p className={`text-sm truncate ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>{category}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </nav>

          {/* Sidebar Footer */}
          <div className={`p-4 border-t ${
            isDarkMode ? 'border-gray-800' : 'border-gray-100'
          }`}>
            <button 
              onClick={() => setShowSettings(true)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-[#E50914] hover:bg-gray-800' 
                  : 'text-gray-700 hover:text-[#E50914] hover:bg-gray-50'
              }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-medium">Settings</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative">
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 z-40 bg-gradient-to-b from-black/90 via-black/60 to-transparent px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="p-2.5 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <button
                onClick={() => navigate('/')}
                className="p-2.5 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                aria-label="Back to home"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>

              {channelName && (
                <div className="hidden md:flex items-center gap-3 pl-2">
                  <div className="w-8 h-8 bg-[#E50914] rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-white font-semibold text-sm leading-tight">{channelName}</h1>
                    {category && (
                      <p className="text-white/60 text-xs">{category}</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-2.5 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <svg className="w-5 h-5" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>

              <button className="p-2.5 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200" aria-label="Share">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>

              <button className="p-2.5 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200" aria-label="More options">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Video Player */}
        <div className="flex-1 w-full h-full">
          <VideoPlayer 
            src={streamUrl || defaultStreamUrl}
            autoPlay={true}
            width="100%"
            height="100%"
            className="w-full h-full"
          />
        </div>
      </main>

      {/* Overlay for sidebar */}
      {showSidebar && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setShowSidebar(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default WatchPage;
