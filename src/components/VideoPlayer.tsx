import React, { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useTheme } from '../context/ThemeContext';
import './VideoPlayer.css';

import PlayIcon from '../assets/svg/001-play.svg';
import PauseIcon from '../assets/svg/003-pause.svg';
import VolumeIcon from '../assets/svg/009-volume.svg';
import MuteIcon from '../assets/svg/012-mute.svg';
import FullscreenIcon from '../assets/svg/040-fullscreen.svg';
import MinimizeIcon from '../assets/svg/041-minimize.svg';

interface VideoPlayerProps {
  src: string;
  autoPlay?: boolean;
  controls?: boolean;
  width?: string;
  height?: string;
  className?: string;
  onError?: (error: any) => void;
  onLoadedMetadata?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  autoPlay = true,
  width = "100%",
  height = "auto",
  className = "",
}) => {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controlsTimeoutRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(autoPlay);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showCanvas, setShowCanvas] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [volume, setVolume] = useState(1);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [qualities, setQualities] = useState<any[]>([]);
  const [currentQuality, setCurrentQuality] = useState<number>(-1);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    // Reset states on new source
    setIsReady(false);
    setIsLoading(true);
    setShowCanvas(false);
    setIsPlaying(autoPlay);
  }, [src, autoPlay]);

  useEffect(() => {
    // Poll for progress updates
    const interval = setInterval(() => {
      if (playerRef.current && isPlaying && !seeking) {
        const video = getInternalPlayer();
        if (video) {
          setPlayed(video.currentTime / video.duration || 0);
          setDuration(video.duration || 0);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, seeking]);

  const getInternalPlayer = (): HTMLVideoElement | null => {
    if (playerRef.current) {
      return playerRef.current.getInternalPlayer() as HTMLVideoElement;
    }
    return null;
  };

  const captureFrame = () => {
    const video = getInternalPlayer();
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    }
  };

  const handleReady = () => {
    setIsReady(true);
    setIsLoading(false);
    const video = getInternalPlayer();
    if (video) {
      setDuration(video.duration || 0);
      
      // Get HLS instance for quality levels
      const player = playerRef.current;
      if (player && player.getInternalPlayer) {
        const internalPlayer = player.getInternalPlayer('hls');
        if (internalPlayer && internalPlayer.levels) {
          const levels = internalPlayer.levels.map((level: any, index: number) => ({
            index,
            height: level.height,
            width: level.width,
            bitrate: level.bitrate,
            name: level.height ? `${level.height}p` : `Level ${index + 1}`
          }));
          setQualities(levels);
          setCurrentQuality(internalPlayer.currentLevel);
        }
      }
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
    setShowCanvas(false);
    setIsLoading(false);
  };

  const handlePause = () => {
    setIsPlaying(false);
    captureFrame();
    setShowCanvas(true);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    captureFrame();
    setShowCanvas(true);
  };

  const handleWaiting = () => {
    setIsLoading(true);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const handlePlayPause = () => {
    if (!isReady) return;
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    setSeeking(false);
    if (playerRef.current) {
      const target = e.target as HTMLInputElement;
      playerRef.current.seekTo(parseFloat(target.value));
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const formatTime = (seconds: number) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  const handleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!isFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleQualityChange = (qualityIndex: number) => {
    const player = playerRef.current;
    if (player && player.getInternalPlayer) {
      const internalPlayer = player.getInternalPlayer('hls');
      if (internalPlayer) {
        internalPlayer.currentLevel = qualityIndex;
        setCurrentQuality(qualityIndex);
        setShowQualityMenu(false);
      }
    }
  };

  const toggleQualityMenu = () => {
    setShowQualityMenu(!showQualityMenu);
  };

  return (
    <div 
      ref={containerRef} 
      className="video-player-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <div className="video-wrapper">
        <ReactPlayer
          ref={playerRef}
          src={src}
          playing={isPlaying}
          muted={isMuted}
          volume={volume}
          playsInline={true}
          controls={false}
          width={width}
          height={height}
          className={className}
          style={{ display: showCanvas ? 'none' : 'block' }}
          onReady={handleReady}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
          onWaiting={handleWaiting}
          onCanPlay={handleCanPlay}
          onError={(error) => console.error('Video playback error:', error)}
          config={{
            hls: {
              maxLoadingDelay: 4,
              minAutoBitrate: 0,
              lowLatencyMode: true,
              enableWorker: false,
              debug: false,
            }
          }}
        />
        <canvas 
          ref={canvasRef} 
          style={{ 
            display: showCanvas ? 'block' : 'none',
            width: '100%',
            height: 'auto'
          }} 
        />
        {isLoading && (
          <div className="loading-indicator">
            <div className="spinner"></div>
          </div>
        )}
        
        {/* Netflix-style controls overlay */}
        <div className={`controls-overlay ${showControls ? 'visible' : ''}`}>
          {/* Play/Pause center button */}
          <button 
            className="center-play-button"
            onClick={handlePlayPause}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            <img 
              src={isPlaying ? PauseIcon : PlayIcon} 
              alt={isPlaying ? 'Pause' : 'Play'} 
              className="center-icon"
            />
          </button>

          {/* Bottom controls bar */}
          <div className="controls-bar">
            {/* Progress bar */}
            <div className="progress-container">
              <input
                type="range"
                min={0}
                max={0.999999}
                step="any"
                value={played}
                onMouseDown={handleSeekMouseDown}
                onChange={handleSeekChange}
                onMouseUp={handleSeekMouseUp}
                className="progress-bar"
              />
            </div>

            {/* Bottom controls */}
            <div className="bottom-controls">
              <div className="controls-left">
                <button
                  onClick={handlePlayPause}
                  className="control-button"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  disabled={!isReady}
                >
                  <img 
                    src={isPlaying ? PauseIcon : PlayIcon} 
                    alt={isPlaying ? 'Pause' : 'Play'} 
                    className="control-icon"
                  />
                </button>
                
                <div className="volume-control">
                  <button
                    onClick={handleMute}
                    className="control-button"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    <img 
                      src={isMuted ? MuteIcon : VolumeIcon} 
                      alt={isMuted ? 'Unmute' : 'Mute'} 
                      className="control-icon"
                    />
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step="any"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="volume-slider"
                  />
                </div>

                <div className="time-display">
                  <span>{formatTime(duration * played)}</span>
                  <span className="time-separator"> / </span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="controls-right">
                <button
                  onClick={toggleQualityMenu}
                  className="control-button quality-button"
                  aria-label="Quality settings"
                  disabled={qualities.length === 0}
                >
                  <svg className="control-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
                
                <button
                  onClick={handleFullscreen}
                  className="control-button"
                  aria-label={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                >
                  <img 
                    src={isFullscreen ? MinimizeIcon : FullscreenIcon} 
                    alt={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'} 
                    className="control-icon"
                  />
                </button>
              </div>
            </div>

            {/* Quality Menu */}
            {showQualityMenu && qualities.length > 0 && (
              <div className={`quality-menu ${isDarkMode ? 'bg-gray-900 border border-gray-700' : ''}`}>
                <div className="quality-menu-header">
                  <span className={`quality-menu-title ${isDarkMode ? 'text-gray-200' : ''}`}>Quality</span>
                  <button 
                    onClick={() => setShowQualityMenu(false)}
                    className="quality-close-button"
                    aria-label="Close quality menu"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="quality-options">
                  <button
                    onClick={() => handleQualityChange(-1)}
                    className={`quality-option ${currentQuality === -1 ? 'active' : ''} ${
                      isDarkMode ? 'text-gray-300 hover:bg-gray-800' : ''
                    }`}
                  >
                    <span>Auto</span>
                    {currentQuality === -1 && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                  {qualities.map((quality) => (
                    <button
                      key={quality.index}
                      onClick={() => handleQualityChange(quality.index)}
                      className={`quality-option ${currentQuality === quality.index ? 'active' : ''} ${
                        isDarkMode ? 'text-gray-300 hover:bg-gray-800' : ''
                      }`}
                    >
                      <span>{quality.name}</span>
                      {currentQuality === quality.index && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;