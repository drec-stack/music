// Music Platform Application

class MusicApp {
    constructor() {
        console.log('MusicApp constructor called');
        this.currentTrack = null;
        this.isPlaying = false;
        this.currentTrackIndex = 0;
        this.queue = tracks;
        this.likedTracks = new Set();
        this.volume = 70;
        this.isShuffle = false;
        this.isRepeat = false;
        
        this.init();
    }

    init() {
        console.log('MusicApp init called');
        try {
            this.loadContent();
            this.setupEventListeners();
            this.setupNavigation();
            this.setupPlayer();
            this.setupSearch();
            this.setupLibraryTabs();
            console.log('MusicApp init completed successfully');
        } catch (error) {
            console.error('Error in MusicApp init:', error);
        }
    }

    loadContent() {
        this.renderRecentlyPlayed();
        this.renderRecommendations();
        this.renderNewReleases();
        this.renderPopularPlaylists();
        this.renderPopularAlbums();
        this.renderTopArtists();
        this.renderPodcasts();
        this.renderUserPlaylists();
        this.renderSidebarPlaylists();
        this.renderRecentSearches();
        this.renderCategories();
        this.renderLibraryContent();
        this.renderProfileContent();
    }

    renderRecommendations() {
        const container = document.getElementById('recommendations');
        if (container) {
            container.innerHTML = playlists.map(playlist => `
                <div class="card-pro io-reveal" data-id="${playlist.id}">
                    <div class="card-pro-content">
                        <div class="card-pro-image">
                            <img src="${playlist.cover}" alt="${playlist.title}">
                            ${playlist.badge ? `<span class="card-pro-badge badge-pro badge-pro-${playlist.badge}">${playlist.badgeText}</span>` : ''}
                            <button class="card-pro-play" onclick="app.playTrack(${playlist.id})">
                                <i class="fas fa-play"></i>
                            </button>
                        </div>
                        <h3 class="card-pro-title">${playlist.title}</h3>
                        <p class="card-pro-subtitle">${playlist.description}</p>
                        <div class="card-pro-footer">
                            <span class="text-sm text-secondary">${playlist.tracks} треков</span>
                            <span class="text-sm text-secondary">${playlist.followers}</span>
                        </div>
                    </div>
                </div>
            `).join('');
            
            // Initialize intersection observer for animations
            this.initIntersectionObserver();
        }
    }

    renderNewReleases() {
        const container = document.getElementById('new-releases');
        if (container) {
            container.innerHTML = albums.slice(0, 6).map(album => `
                <div class="card-pro io-reveal" data-id="${album.id}">
                    <div class="card-pro-content">
                        <div class="card-pro-image">
                            <img src="${album.cover}" alt="${album.title}">
                            ${album.badge ? `<span class="card-pro-badge badge-pro badge-pro-${album.badge}">${album.badgeText}</span>` : ''}
                            <button class="card-pro-play" onclick="app.playTrack(${album.id})">
                                <i class="fas fa-play"></i>
                            </button>
                        </div>
                        <h3 class="card-pro-title">${album.title}</h3>
                        <p class="card-pro-subtitle">${album.artist} • ${album.year}</p>
                        <div class="card-pro-footer">
                            <span class="text-sm text-secondary">${album.tracks} треков</span>
                            <span class="text-sm text-secondary">${album.year}</span>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    renderPopularPlaylists() {
        const container = document.getElementById('popular-playlists');
        if (container) {
            container.innerHTML = playlists.map(playlist => `
                <div class="card-pro io-reveal" data-id="${playlist.id}">
                    <div class="card-pro-content">
                        <div class="card-pro-image">
                            <img src="${playlist.cover}" alt="${playlist.title}">
                            ${playlist.badge ? `<span class="card-pro-badge badge-pro badge-pro-${playlist.badge}">${playlist.badgeText}</span>` : ''}
                            <button class="card-pro-play" onclick="app.playTrack(${playlist.id})">
                                <i class="fas fa-play"></i>
                            </button>
                        </div>
                        <h3 class="card-pro-title">${playlist.title}</h3>
                        <p class="card-pro-subtitle">${playlist.description}</p>
                        <div class="card-pro-footer">
                            <span class="text-sm text-secondary">${playlist.tracks} треков</span>
                            <span class="text-sm text-secondary">${playlist.followers}</span>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    renderRecentlyPlayed() {
        const container = document.getElementById('recently-played');
        if (container) {
            container.innerHTML = playlists.slice(0, 8).map(playlist => `
                <div class="horizontal-scroll-card" data-id="${playlist.id}">
                    <div class="horizontal-scroll-card-image">
                        <img src="${playlist.cover}" alt="${playlist.title}">
                        <button class="horizontal-scroll-card-play" onclick="app.playTrack(${playlist.id})">
                            <i class="fas fa-play"></i>
                        </button>
                    </div>
                    <h3 class="horizontal-scroll-card-title">${playlist.title}</h3>
                    <p class="horizontal-scroll-card-subtitle">${playlist.description}</p>
                </div>
            `).join('');
        }
    }

    renderPodcasts() {
        const container = document.getElementById('podcasts');
        if (container) {
            container.innerHTML = playlists.slice(0, 6).map(playlist => `
                <div class="card-pro io-reveal" data-id="${playlist.id}">
                    <div class="card-pro-content">
                        <div class="card-pro-image">
                            <img src="${playlist.cover}" alt="${playlist.title}">
                            <button class="card-pro-play" onclick="app.playTrack(${playlist.id})">
                                <i class="fas fa-play"></i>
                            </button>
                        </div>
                        <h3 class="card-pro-title">${playlist.title}</h3>
                        <p class="card-pro-subtitle">${playlist.description}</p>
                    </div>
                </div>
            `).join('');
        }
    }

    renderUserPlaylists() {
        const container = document.getElementById('user-playlists');
        if (container) {
            container.innerHTML = playlists.slice(0, 4).map(playlist => `
                <div class="card-pro io-reveal" data-id="${playlist.id}">
                    <div class="card-pro-content">
                        <div class="card-pro-image">
                            <img src="${playlist.cover}" alt="${playlist.title}">
                            <button class="card-pro-play" onclick="app.playTrack(${playlist.id})">
                                <i class="fas fa-play"></i>
                            </button>
                        </div>
                        <h3 class="card-pro-title">${playlist.title}</h3>
                        <p class="card-pro-subtitle">${playlist.description}</p>
                    </div>
                </div>
            `).join('');
        }
    }

    renderPopularAlbums() {
        const container = document.getElementById('popular-albums');
        if (container) {
            container.innerHTML = albums.map(album => `
                <div class="card-pro io-reveal" data-id="${album.id}">
                    <div class="card-pro-content">
                        <div class="card-pro-image">
                            <img src="${album.cover}" alt="${album.title}">
                            ${album.badge ? `<span class="card-pro-badge badge-pro badge-pro-${album.badge}">${album.badgeText}</span>` : ''}
                            <button class="card-pro-play" onclick="app.playTrack(${album.id})">
                                <i class="fas fa-play"></i>
                            </button>
                        </div>
                        <h3 class="card-pro-title">${album.title}</h3>
                        <p class="card-pro-subtitle">${album.artist} • ${album.year}</p>
                        <div class="card-pro-footer">
                            <span class="text-sm text-secondary">${album.tracks} треков</span>
                            <span class="text-sm text-secondary">${album.year}</span>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    renderTopArtists() {
        const container = document.getElementById('top-artists');
        if (container) {
            container.innerHTML = artists.map(artist => `
                <div class="card-pro io-reveal" data-id="${artist.id}" style="text-align: center;">
                    <div class="card-pro-content">
                        <div class="card-pro-image" style="border-radius: 50%; aspect-ratio: 1;">
                            <img src="${artist.image}" alt="${artist.name}" style="border-radius: 50%;">
                        </div>
                        <h3 class="card-pro-title">${artist.name}</h3>
                        <p class="card-pro-subtitle">${artist.followers} подписчиков</p>
                    </div>
                </div>
            `).join('');
        }
    }

    initIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        // Observe all elements with io-reveal class
        document.querySelectorAll('.io-reveal').forEach(el => {
            observer.observe(el);
        });
    }

    renderSidebarPlaylists() {
        const container = document.getElementById('sidebar-playlists');
        if (container) {
            container.innerHTML = playlists.slice(0, 5).map(playlist => `
                <div class="playlist-item">${playlist.title}</div>
            `).join('');
        }
    }

    renderRecentSearches() {
        const container = document.getElementById('recent-searches');
        if (container) {
            container.innerHTML = recentSearches.map(search => `
                <div class="recent-search-item">
                    <i class="fas fa-clock"></i>
                    <span>${search}</span>
                </div>
            `).join('');
        }
    }

    renderCategories() {
        const container = document.getElementById('categories');
        if (container) {
            container.innerHTML = categories.map(category => `
                <div class="category-card" style="background: ${category.color}">
                    <span>${category.name}</span>
                </div>
            `).join('');
        }
    }

    renderLibraryContent() {
        // Playlists
        const playlistsContainer = document.getElementById('library-playlists');
        if (playlistsContainer) {
            playlistsContainer.innerHTML = userLibrary.playlists.map(playlist => `
                <div class="card">
                    <div class="card-image">
                        <img src="${playlist.cover}" alt="${playlist.title}">
                        <button class="card-play-btn" onclick="app.playTrack(${playlist.id})">
                            <i class="fas fa-play"></i>
                        </button>
                    </div>
                    <div class="card-title">${playlist.title}</div>
                    <div class="card-subtitle">${playlist.tracks} треков</div>
                </div>
            `).join('');
        }

        // Albums
        const albumsContainer = document.getElementById('library-albums');
        if (albumsContainer) {
            albumsContainer.innerHTML = userLibrary.albums.map(album => `
                <div class="card">
                    <div class="card-image">
                        <img src="${album.cover}" alt="${album.title}">
                        <button class="card-play-btn" onclick="app.playTrack(${album.id})">
                            <i class="fas fa-play"></i>
                        </button>
                    </div>
                    <div class="card-title">${album.title}</div>
                    <div class="card-subtitle">${album.artist}</div>
                </div>
            `).join('');
        }

        // Artists
        const artistsContainer = document.getElementById('library-artists');
        if (artistsContainer) {
            artistsContainer.innerHTML = userLibrary.artists.map(artist => `
                <div class="artist-card">
                    <div class="artist-image">
                        <img src="${artist.image}" alt="${artist.name}">
                    </div>
                    <div class="artist-name">${artist.name}</div>
                    <div class="artist-type">${artist.type}</div>
                </div>
            `).join('');
        }

        // Tracks
        const tracksContainer = document.getElementById('library-tracks');
        if (tracksContainer) {
            tracksContainer.innerHTML = userLibrary.tracks.map((track, index) => `
                <div class="track-item" onclick="app.playTrack(${track.id})">
                    <div class="track-number">${index + 1}</div>
                    <div class="track-image">
                        <img src="${track.cover}" alt="${track.title}">
                    </div>
                    <div class="track-info">
                        <div class="track-name">${track.title}</div>
                        <div class="track-artist">${track.artist}</div>
                    </div>
                    <div class="track-duration">${track.duration}</div>
                </div>
            `).join('');
        }
    }

    renderProfileContent() {
        // Recent tracks
        const recentContainer = document.getElementById('recent-tracks');
        if (recentContainer) {
            recentContainer.innerHTML = tracks.slice(0, 4).map(track => `
                <div class="card">
                    <div class="card-image">
                        <img src="${track.cover}" alt="${track.title}">
                        <button class="card-play-btn" onclick="app.playTrack(${track.id})">
                            <i class="fas fa-play"></i>
                        </button>
                    </div>
                    <div class="card-title">${track.title}</div>
                    <div class="card-subtitle">${track.artist}</div>
                </div>
            `).join('');
        }

        // Favorite tracks
        const favoritesContainer = document.getElementById('favorite-tracks');
        if (favoritesContainer) {
            favoritesContainer.innerHTML = favoriteTracks.map((track, index) => `
                <div class="track-item" onclick="app.playTrack(${track.id})">
                    <div class="track-number">${index + 1}</div>
                    <div class="track-image">
                        <img src="${track.cover}" alt="${track.title}">
                    </div>
                    <div class="track-info">
                        <div class="track-name">${track.title}</div>
                        <div class="track-artist">${track.artist}</div>
                    </div>
                    <div class="track-duration">${track.duration}</div>
                </div>
            `).join('');
        }
    }

    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-pro-item');
        const pages = document.querySelectorAll('.page');

        console.log('Navigation setup:', navItems.length, 'nav items', pages.length, 'pages');

        if (navItems.length === 0) {
            console.error('No navigation items found!');
            return;
        }

        if (pages.length === 0) {
            console.error('No pages found!');
            return;
        }

        navItems.forEach((item, index) => {
            console.log('Setting up nav item', index, 'data-page:', item.dataset.page);
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.dataset.page;
                console.log('Navigation clicked:', page);
                
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
                
                pages.forEach(p => p.classList.remove('active'));
                const targetPage = document.getElementById(`${page}-page`);
                if (targetPage) {
                    targetPage.classList.add('active');
                    console.log('Page activated:', page);
                } else {
                    console.error('Page not found:', page);
                }
            });
        });
    }

    setupLibraryTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabs = document.querySelectorAll('.library-tab');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabName = button.dataset.tab;
                
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                tabs.forEach(tab => tab.classList.remove('active'));
                document.getElementById(`${tabName}-tab`).classList.add('active');
            });
        });
    }

    setupSearch() {
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            
            if (query.length > 0) {
                const filteredTracks = tracks.filter(track => 
                    track.title.toLowerCase().includes(query) || 
                    track.artist.toLowerCase().includes(query)
                );
                
                const filteredArtists = artists.filter(artist =>
                    artist.name.toLowerCase().includes(query)
                );
                
                const filteredAlbums = albums.filter(album =>
                    album.title.toLowerCase().includes(query) ||
                    album.artist.toLowerCase().includes(query)
                );

                searchResults.innerHTML = `
                    ${filteredTracks.length > 0 ? `
                        <div class="search-section">
                            <h3>Треки</h3>
                            <div class="tracks-list">
                                ${filteredTracks.map(track => `
                                    <div class="track-item" onclick="app.playTrack(${track.id})">
                                        <div class="track-image">
                                            <img src="${track.cover}" alt="${track.title}">
                                        </div>
                                        <div class="track-info">
                                            <div class="track-name">${track.title}</div>
                                            <div class="track-artist">${track.artist}</div>
                                        </div>
                                        <div class="track-duration">${track.duration}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    ${filteredArtists.length > 0 ? `
                        <div class="search-section">
                            <h3>Артисты</h3>
                            <div class="artists-grid">
                                ${filteredArtists.map(artist => `
                                    <div class="artist-card">
                                        <div class="artist-image">
                                            <img src="${artist.image}" alt="${artist.name}">
                                        </div>
                                        <div class="artist-name">${artist.name}</div>
                                        <div class="artist-type">${artist.type}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    ${filteredAlbums.length > 0 ? `
                        <div class="search-section">
                            <h3>Альбомы</h3>
                            <div class="cards-grid">
                                ${filteredAlbums.map(album => `
                                    <div class="card">
                                        <div class="card-image">
                                            <img src="${album.cover}" alt="${album.title}">
                                            <button class="card-play-btn" onclick="app.playTrack(${album.id})">
                                                <i class="fas fa-play"></i>
                                            </button>
                                        </div>
                                        <div class="card-title">${album.title}</div>
                                        <div class="card-subtitle">${album.artist}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                `;
            } else {
                this.renderRecentSearches();
                searchResults.innerHTML = `
                    <div class="search-section">
                        <h3>Недавно искали</h3>
                        <div class="recent-searches" id="recent-searches"></div>
                    </div>
                    <div class="search-section">
                        <h3>Популярные категории</h3>
                        <div class="categories-grid" id="categories"></div>
                    </div>
                `;
                this.renderRecentSearches();
                const categoriesContainer = document.getElementById('categories');
                categoriesContainer.innerHTML = categories.map(category => `
                    <div class="category-card" style="background: ${category.color}">
                        <span>${category.name}</span>
                    </div>
                `).join('');
            }
        });
    }

    setupPlayer() {
        const playBtn = document.getElementById('play-btn');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const shuffleBtn = document.getElementById('shuffle-btn');
        const repeatBtn = document.getElementById('repeat-btn');
        const likeBtn = document.getElementById('like-btn');
        const progressInput = document.getElementById('progress-input');
        const volumeInput = document.getElementById('volume-input');
        const volumeBtn = document.getElementById('volume-btn');

        playBtn.addEventListener('click', () => this.togglePlay());
        prevBtn.addEventListener('click', () => this.playPrevious());
        nextBtn.addEventListener('click', () => this.playNext());
        shuffleBtn.addEventListener('click', () => this.toggleShuffle());
        repeatBtn.addEventListener('click', () => this.toggleRepeat());
        likeBtn.addEventListener('click', () => this.toggleLike());
        
        progressInput.addEventListener('input', (e) => {
            const progress = e.target.value;
            document.getElementById('progress-fill').style.width = `${progress}%`;
        });

        volumeInput.addEventListener('input', (e) => {
            this.volume = e.target.value;
            document.getElementById('volume-fill').style.width = `${this.volume}%`;
            this.updateVolumeIcon();
        });

        volumeBtn.addEventListener('click', () => {
            if (this.volume > 0) {
                this.previousVolume = this.volume;
                this.volume = 0;
            } else {
                this.volume = this.previousVolume || 70;
            }
            volumeInput.value = this.volume;
            document.getElementById('volume-fill').style.width = `${this.volume}%`;
            this.updateVolumeIcon();
        });
    }

    setupEventListeners() {
        // Header search
        const headerSearch = document.querySelector('.search-bar input');
        headerSearch.addEventListener('focus', () => {
            const searchNavItem = document.querySelector('.nav-pro-item[data-page="search"]');
            if (searchNavItem) {
                searchNavItem.click();
            }
        });

        // Create playlist button
        const createPlaylistBtn = document.querySelector('.create-playlist-btn');
        createPlaylistBtn.addEventListener('click', () => {
            const playlistName = prompt('Введите название плейлиста:');
            if (playlistName) {
                const container = document.getElementById('sidebar-playlists');
                const newPlaylist = document.createElement('div');
                newPlaylist.className = 'playlist-item';
                newPlaylist.textContent = playlistName;
                container.appendChild(newPlaylist);
            }
        });

        // Card hover effects
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('.card')) {
                e.target.closest('.card').style.transform = 'translateY(-8px)';
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.closest('.card')) {
                e.target.closest('.card').style.transform = 'translateY(0)';
            }
        });
    }

    playTrack(trackId) {
        const track = tracks.find(t => t.id === trackId) || tracks[0];
        this.currentTrack = track;
        this.currentTrackIndex = tracks.findIndex(t => t.id === trackId);
        
        document.getElementById('player-cover').src = track.cover;
        document.getElementById('player-title').textContent = track.title;
        document.getElementById('player-artist').textContent = track.artist;
        document.getElementById('total-time').textContent = track.duration;
        
        this.isPlaying = true;
        this.updatePlayButton();
        this.simulateProgress();
    }

    togglePlay() {
        this.isPlaying = !this.isPlaying;
        this.updatePlayButton();
        
        if (this.isPlaying) {
            this.simulateProgress();
        }
    }

    updatePlayButton() {
        const playBtn = document.getElementById('play-btn');
        playBtn.innerHTML = this.isPlaying 
            ? '<i class="fas fa-pause"></i>' 
            : '<i class="fas fa-play"></i>';
    }

    playPrevious() {
        this.currentTrackIndex = (this.currentTrackIndex - 1 + this.queue.length) % this.queue.length;
        this.playTrack(this.queue[this.currentTrackIndex].id);
    }

    playNext() {
        if (this.isShuffle) {
            this.currentTrackIndex = Math.floor(Math.random() * this.queue.length);
        } else {
            this.currentTrackIndex = (this.currentTrackIndex + 1) % this.queue.length;
        }
        this.playTrack(this.queue[this.currentTrackIndex].id);
    }

    toggleShuffle() {
        this.isShuffle = !this.isShuffle;
        document.getElementById('shuffle-btn').classList.toggle('active', this.isShuffle);
    }

    toggleRepeat() {
        this.isRepeat = !this.isRepeat;
        document.getElementById('repeat-btn').classList.toggle('active', this.isRepeat);
    }

    toggleLike() {
        const likeBtn = document.getElementById('like-btn');
        likeBtn.classList.toggle('liked');
        
        if (likeBtn.classList.contains('liked')) {
            likeBtn.innerHTML = '<i class="fas fa-heart"></i>';
            if (this.currentTrack) {
                this.likedTracks.add(this.currentTrack.id);
            }
        } else {
            likeBtn.innerHTML = '<i class="far fa-heart"></i>';
            if (this.currentTrack) {
                this.likedTracks.delete(this.currentTrack.id);
            }
        }
    }

    updateVolumeIcon() {
        const volumeBtn = document.getElementById('volume-btn');
        if (this.volume === 0) {
            volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else if (this.volume < 50) {
            volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
        } else {
            volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    }

    simulateProgress() {
        if (!this.isPlaying) return;
        
        const progressFill = document.getElementById('progress-fill');
        const progressInput = document.getElementById('progress-input');
        const currentTimeEl = document.getElementById('current-time');
        
        let progress = parseFloat(progressInput.value);
        
        const interval = setInterval(() => {
            if (!this.isPlaying) {
                clearInterval(interval);
                return;
            }
            
            progress += 0.5;
            if (progress >= 100) {
                progress = 0;
                if (this.isRepeat) {
                    this.playTrack(this.currentTrack.id);
                } else {
                    this.playNext();
                }
                clearInterval(interval);
                return;
            }
            
            progressFill.style.width = `${progress}%`;
            progressInput.value = progress;
            
            // Update current time
            const totalSeconds = this.parseDuration(this.currentTrack?.duration || '3:20');
            const currentSeconds = Math.floor((progress / 100) * totalSeconds);
            currentTimeEl.textContent = this.formatTime(currentSeconds);
        }, 100);
    }

    parseDuration(duration) {
        const [minutes, seconds] = duration.split(':').map(Number);
        return minutes * 60 + seconds;
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Prevent duplicate initialization
    if (window.app) {
        console.log('MusicApp already initialized, skipping duplicate initialization');
        return;
    }
    
    window.app = new MusicApp();
    
    // Initialize orbital timeline when timeline page is loaded
    const navTimeline = document.querySelector('.nav-pro-item[data-page="timeline"]');
    if (navTimeline) {
        navTimeline.addEventListener('click', () => {
            setTimeout(() => {
                const timelineData = [
                    { id: 1, title: 'Первый трек', date: '2024-01-15', type: 'track' },
                    { id: 2, title: 'Новый альбом', date: '2024-02-20', type: 'album' },
                    { id: 3, title: 'Концерт', date: '2024-03-10', type: 'event' },
                    { id: 4, title: 'Плейлист', date: '2024-04-05', type: 'playlist' },
                    { id: 5, title: 'Подписка', date: '2024-05-12', type: 'subscription' }
                ];
                const container = document.getElementById('orbital-timeline');
                if (container && container.children.length === 0) {
                    new OrbitalTimeline('orbital-timeline', timelineData);
                }
            }, 100);
        });
    }
});
