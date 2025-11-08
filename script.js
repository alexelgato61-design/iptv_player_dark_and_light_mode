// Theme management
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = this.themeToggle.querySelector('.theme-icon');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        this.themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
    }
}

// Channel management
class ChannelManager {
    constructor() {
        this.channels = this.loadChannels();
        this.currentChannel = null;
        this.channelListContainer = document.getElementById('channelListContainer');
        this.channelSearch = document.getElementById('channelSearch');
        this.init();
    }

    init() {
        this.renderChannels();
        this.channelSearch.addEventListener('input', (e) => this.searchChannels(e.target.value));
        
        // Add sample channels if none exist
        if (this.channels.length === 0) {
            this.addSampleChannels();
        }
    }

    loadChannels() {
        const stored = localStorage.getItem('iptvChannels');
        return stored ? JSON.parse(stored) : [];
    }

    saveChannels() {
        localStorage.setItem('iptvChannels', JSON.stringify(this.channels));
    }

    addChannel(name, url) {
        const channel = {
            id: Date.now(),
            name: name.trim(),
            url: url.trim()
        };
        this.channels.push(channel);
        this.saveChannels();
        this.renderChannels();
        return channel;
    }

    deleteChannel(id) {
        this.channels = this.channels.filter(ch => ch.id !== id);
        this.saveChannels();
        if (this.currentChannel && this.currentChannel.id === id) {
            player.stop();
        }
        this.renderChannels();
    }

    renderChannels(filter = '') {
        const filteredChannels = filter
            ? this.channels.filter(ch => ch.name.toLowerCase().includes(filter.toLowerCase()))
            : this.channels;

        this.channelListContainer.innerHTML = '';
        
        if (filteredChannels.length === 0) {
            const emptyMessage = document.createElement('li');
            emptyMessage.style.padding = '1rem';
            emptyMessage.style.textAlign = 'center';
            emptyMessage.style.color = 'var(--text-secondary)';
            emptyMessage.textContent = filter ? 'No channels found' : 'No channels added yet';
            this.channelListContainer.appendChild(emptyMessage);
            return;
        }

        filteredChannels.forEach(channel => {
            const li = document.createElement('li');
            li.className = 'channel-item';
            if (this.currentChannel && this.currentChannel.id === channel.id) {
                li.classList.add('active');
            }

            const nameSpan = document.createElement('span');
            nameSpan.className = 'channel-name';
            nameSpan.textContent = channel.name;

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerHTML = '&times;';
            deleteBtn.title = 'Delete channel';
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm(`Delete channel "${channel.name}"?`)) {
                    this.deleteChannel(channel.id);
                }
            });

            li.appendChild(nameSpan);
            li.appendChild(deleteBtn);
            
            li.addEventListener('click', () => {
                this.selectChannel(channel);
            });

            this.channelListContainer.appendChild(li);
        });
    }

    selectChannel(channel) {
        this.currentChannel = channel;
        player.play(channel);
        this.renderChannels();
    }

    searchChannels(query) {
        this.renderChannels(query);
    }

    addSampleChannels() {
        // Add some sample channels for demonstration
        const sampleChannels = [
            { name: 'Sample Channel 1', url: 'https://example.com/stream1.m3u8' },
            { name: 'Sample Channel 2', url: 'https://example.com/stream2.m3u8' },
            { name: 'Sample Channel 3', url: 'https://example.com/stream3.m3u8' },
            { name: 'Demo Stream', url: 'https://example.com/demo.m3u8' }
        ];

        sampleChannels.forEach(ch => {
            this.addChannel(ch.name, ch.url);
        });
    }
}

// Video player management
class VideoPlayer {
    constructor() {
        this.videoElement = document.getElementById('videoPlayer');
        this.placeholder = document.querySelector('.video-placeholder');
        this.currentChannelName = document.getElementById('currentChannelName');
    }

    play(channel) {
        // In a real application, you would set the video source here
        // this.videoElement.src = channel.url;
        
        // For demonstration purposes, we'll just update the UI
        this.currentChannelName.textContent = channel.name;
        
        // Show video player (in real app with actual stream)
        // this.videoElement.classList.add('active');
        // this.placeholder.classList.add('hidden');
        // this.videoElement.play();
        
        // For demo, just show a message
        this.placeholder.innerHTML = `
            <div style="text-align: center;">
                <p style="font-size: 1.2rem; margin-bottom: 1rem;">
                    Now playing: <strong>${channel.name}</strong>
                </p>
                <p style="font-size: 0.9rem; color: var(--text-secondary);">
                    Stream URL: ${channel.url}
                </p>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 1rem;">
                    Note: This is a demo. Connect to a valid stream URL to play actual content.
                </p>
            </div>
        `;
    }

    stop() {
        this.videoElement.pause();
        this.videoElement.src = '';
        this.videoElement.classList.remove('active');
        this.placeholder.classList.remove('hidden');
        this.currentChannelName.textContent = 'No channel selected';
        this.placeholder.innerHTML = '<p>Select a channel to start watching</p>';
    }
}

// Modal management
class ModalManager {
    constructor() {
        this.modal = document.getElementById('addChannelModal');
        this.addChannelBtn = document.getElementById('addChannelBtn');
        this.saveChannelBtn = document.getElementById('saveChannelBtn');
        this.closeButtons = document.querySelectorAll('.close-modal');
        this.channelNameInput = document.getElementById('channelName');
        this.channelUrlInput = document.getElementById('channelUrl');
        this.init();
    }

    init() {
        this.addChannelBtn.addEventListener('click', () => this.open());
        this.saveChannelBtn.addEventListener('click', () => this.save());
        
        this.closeButtons.forEach(btn => {
            btn.addEventListener('click', () => this.close());
        });

        // Close modal when clicking outside
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        // Handle Enter key in inputs
        this.channelNameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.channelUrlInput.focus();
            }
        });

        this.channelUrlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.save();
            }
        });
    }

    open() {
        this.modal.classList.add('active');
        this.channelNameInput.focus();
    }

    close() {
        this.modal.classList.remove('active');
        this.channelNameInput.value = '';
        this.channelUrlInput.value = '';
    }

    save() {
        const name = this.channelNameInput.value.trim();
        const url = this.channelUrlInput.value.trim();

        if (!name) {
            alert('Please enter a channel name');
            this.channelNameInput.focus();
            return;
        }

        if (!url) {
            alert('Please enter a stream URL');
            this.channelUrlInput.focus();
            return;
        }

        channelManager.addChannel(name, url);
        this.close();
    }
}

// Initialize application
let themeManager, channelManager, player, modalManager;

document.addEventListener('DOMContentLoaded', () => {
    themeManager = new ThemeManager();
    channelManager = new ChannelManager();
    player = new VideoPlayer();
    modalManager = new ModalManager();
});
