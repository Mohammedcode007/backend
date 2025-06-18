// utils/handlePlayCommand.js
const ytSearch = require('yt-search');
const axios = require('axios');

async function searchSongMp3(songName) {
  try {
    const result = await ytSearch(songName);
    const video = result.videos.length > 0 ? result.videos[0] : null;

    if (!video) return null;

    // 🔑 استبدل هذا المفتاح بمفتاحك الخاص من RapidAPI
    const options = {
      method: 'GET',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      params: { id: video.videoId },
      headers: {
        'X-RapidAPI-Key': '9d77c1692dmshb2fe1e825ee4aaap11d28cjsn87a78b77c8ac',
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com',
      },
    };

    const response = await axios.request(options);

    if (!response.data.link) return null;
console.log(response);

    return {
      title: video.title,
      ytUrl: video.url,
      mp3Url: response.data.link, // ✅ هذا هو رابط mp3 المباشر
    };
  } catch (err) {
    console.error('YT Search or Download Error:', err.message);
    return null;
  }
}

module.exports = { searchSongMp3 };
