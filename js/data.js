// Mock Data for Music Platform

const tracks = [
    {
        id: 1,
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        duration: "3:20",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
        audio: ""
    },
    {
        id: 2,
        title: "Levitating",
        artist: "Dua Lipa",
        album: "Future Nostalgia",
        duration: "3:23",
        cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
        audio: ""
    },
    {
        id: 3,
        title: "Stay",
        artist: "The Kid LAROI, Justin Bieber",
        album: "F*CK LOVE 3",
        duration: "2:21",
        cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
        audio: ""
    },
    {
        id: 4,
        title: "Heat Waves",
        artist: "Glass Animals",
        album: "Dreamland",
        duration: "3:58",
        cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
        audio: ""
    },
    {
        id: 5,
        title: "Good 4 U",
        artist: "Olivia Rodrigo",
        album: "SOUR",
        duration: "2:58",
        cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
        audio: ""
    },
    {
        id: 6,
        title: "Peaches",
        artist: "Justin Bieber",
        album: "Justice",
        duration: "3:18",
        cover: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop",
        audio: ""
    },
    {
        id: 7,
        title: "Montero",
        artist: "Lil Nas X",
        album: "MONTERO",
        duration: "2:17",
        cover: "https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=300&h=300&fit=crop",
        audio: ""
    },
    {
        id: 8,
        title: "Kiss Me More",
        artist: "Doja Cat ft. SZA",
        album: "Planet Her",
        duration: "3:28",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
        audio: ""
    },
    {
        id: 9,
        title: "Save Your Tears",
        artist: "The Weeknd",
        album: "After Hours",
        duration: "3:35",
        cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
        audio: ""
    },
    {
        id: 10,
        title: "Drivers License",
        artist: "Olivia Rodrigo",
        album: "SOUR",
        duration: "4:02",
        cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
        audio: ""
    }
];

const albums = [
    {
        id: 1,
        title: "After Hours",
        artist: "The Weeknd",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
        year: 2020,
        tracks: 14,
        badge: "popular",
        badgeText: "Хит"
    },
    {
        id: 2,
        title: "Future Nostalgia",
        artist: "Dua Lipa",
        cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
        year: 2020,
        tracks: 11,
        badge: "new",
        badgeText: "Новинка"
    },
    {
        id: 3,
        title: "Dreamland",
        artist: "Glass Animals",
        cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
        year: 2020,
        tracks: 16
    },
    {
        id: 4,
        title: "SOUR",
        artist: "Olivia Rodrigo",
        cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
        year: 2021,
        tracks: 11,
        badge: "trending",
        badgeText: "В тренде"
    },
    {
        id: 5,
        title: "Justice",
        artist: "Justin Bieber",
        cover: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop",
        year: 2021,
        tracks: 16
    },
    {
        id: 6,
        title: "Planet Her",
        artist: "Doja Cat",
        cover: "https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=300&h=300&fit=crop",
        year: 2021,
        tracks: 14,
        badge: "featured",
        badgeText: "Рекомендуем"
    }
];

const artists = [
    {
        id: 1,
        name: "The Weeknd",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
        followers: "85M",
        type: "Artist"
    },
    {
        id: 2,
        name: "Dua Lipa",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
        followers: "72M",
        type: "Artist"
    },
    {
        id: 3,
        name: "Olivia Rodrigo",
        image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
        followers: "28M",
        type: "Artist"
    },
    {
        id: 4,
        name: "Justin Bieber",
        image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop",
        followers: "68M",
        type: "Artist"
    },
    {
        id: 5,
        name: "Doja Cat",
        image: "https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=300&h=300&fit=crop",
        followers: "55M",
        type: "Artist"
    },
    {
        id: 6,
        name: "Lil Nas X",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
        followers: "42M",
        type: "Artist"
    }
];

const playlists = [
    {
        id: 1,
        title: "Today's Top Hits",
        description: "The hottest tracks right now",
        cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
        tracks: 50,
        followers: "12M",
        badge: "popular",
        badgeText: "Популярное"
    },
    {
        id: 2,
        title: "RapCaviar",
        description: "New music from Drake, Travis Scott and more",
        cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
        tracks: 50,
        followers: "14M",
        badge: "new",
        badgeText: "Новое"
    },
    {
        id: 3,
        title: "All Out 2010s",
        description: "The biggest songs of the 2010s",
        cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
        tracks: 100,
        followers: "8M",
        badge: "trending",
        badgeText: "В тренде"
    },
    {
        id: 4,
        title: "Rock Classics",
        description: "Rock legends & epic guitar riffs",
        cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
        tracks: 75,
        followers: "6M",
        badge: "exclusive",
        badgeText: "Эксклюзив"
    },
    {
        id: 5,
        title: "Chill Hits",
        description: "Kick back to the best new chill music",
        cover: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop",
        tracks: 60,
        followers: "5M"
    },
    {
        id: 6,
        title: "Mood Booster",
        description: "Feel-good tunes to lift your spirits",
        cover: "https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=300&h=300&fit=crop",
        tracks: 55,
        followers: "7M",
        badge: "featured",
        badgeText: "Рекомендуем"
    }
];

const categories = [
    { name: "Поп", color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
    { name: "Рок", color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
    { name: "Хип-хоп", color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
    { name: "Электроника", color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" },
    { name: "R&B", color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)" },
    { name: "Джаз", color: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)" },
    { name: "Классика", color: "linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)" },
    { name: "Инди", color: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)" }
];

const recentSearches = [
    "The Weeknd",
    "Dua Lipa",
    "Pop music",
    "Summer hits"
];

// User library data
const userLibrary = {
    playlists: playlists.slice(0, 4),
    albums: albums.slice(0, 3),
    artists: artists.slice(0, 3),
    tracks: tracks.slice(0, 5)
};

const favoriteTracks = tracks.slice(0, 6);
