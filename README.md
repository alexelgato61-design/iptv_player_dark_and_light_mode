# IPTV Player with Dark and Light Mode

A modern, responsive web-based IPTV player with support for both dark and light themes.

## Features

- 🎨 **Dark & Light Mode**: Toggle between dark and light themes with smooth transitions
- 📺 **Channel Management**: Add, delete, and search channels easily
- 🎬 **Video Player**: Built-in video player with standard controls
- 💾 **Local Storage**: Channels and theme preferences are saved locally
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 🔍 **Channel Search**: Quickly find channels with real-time search

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, but recommended for testing)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/alexelgato61-design/iptv_player_dark_and_light_mode.git
cd iptv_player_dark_and_light_mode
```

2. Open `index.html` in your web browser or serve it using a local web server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

3. Navigate to `http://localhost:8000` in your browser

## Usage

### Adding Channels

1. Click the **"+ Add Channel"** button in the channel list
2. Enter the channel name and stream URL
3. Click **"Save Channel"** to add it to your list

### Playing Content

1. Click on any channel in the channel list to start playback
2. The video player will display the selected channel
3. Use the standard video controls to play, pause, and adjust volume

### Theme Switching

- Click the theme toggle button (🌙/☀️) in the header to switch between dark and light modes
- Your theme preference is automatically saved and persisted

### Searching Channels

- Use the search box above the channel list to filter channels by name
- The list updates in real-time as you type

### Deleting Channels

- Click the **×** button next to any channel to delete it
- Confirm the deletion when prompted

## File Structure

```
iptv_player_dark_and_light_mode/
├── index.html      # Main HTML structure
├── styles.css      # CSS with theme variables and styles
├── script.js       # JavaScript for functionality
└── README.md       # This file
```

## Technical Details

### Theme Implementation

The application uses CSS custom properties (variables) to manage themes:

- Light mode: Uses bright backgrounds and dark text
- Dark mode: Uses dark backgrounds and light text
- Smooth transitions between theme changes
- Theme preference saved in localStorage

### Data Storage

- Channels are stored in browser's localStorage
- Theme preference is stored in localStorage
- Data persists across browser sessions

### Browser Compatibility

- Modern browsers with ES6+ support
- CSS Grid and Flexbox for layout
- localStorage for data persistence

## Customization

### Modifying Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-bg: #ffffff;
    --accent-color: #2196F3;
    /* ... other variables */
}

[data-theme="dark"] {
    --primary-bg: #1a1a1a;
    --accent-color: #42A5F5;
    /* ... other variables */
}
```

### Adding Features

The code is organized into classes for easy extension:
- `ThemeManager`: Handles theme switching
- `ChannelManager`: Manages channel list and storage
- `VideoPlayer`: Controls video playback
- `ModalManager`: Handles the add channel modal

## Notes

- This is a demonstration application with sample channels
- For production use, connect to valid IPTV stream URLs
- Ensure you have the rights to stream any content you add

## License

This project is open source and available for personal and educational use.

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.