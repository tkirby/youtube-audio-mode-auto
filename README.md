<!-- ![YouTube Audio Mode](promo_images/marquee_promo.png) -->

# YouTube Audio Mode Auto

**Audio-only YouTube that switches on by itself for songs.**

YouTube Audio Mode Auto is a fork of [YouTube Audio Mode](https://github.com/devahmedadli/youtube-audio-mode), a lightweight Chrome extension that plays videos in audio-only mode. It drops the video quality to 144p and hides the video player, replacing it with a beautiful audio visualizer. This drastically reduces internet data usage, making it perfect for music streaming, listening to podcasts, or saving bandwidth on metered connections.

This fork adds two things: automatic detection, so audio mode turns on for songs and the full picture comes back for anything else, and smoother quality switching, so changing modes doesn't throw away your buffer.

## ✨ Key Features

- **🤖 Auto Music:** Detects songs and switches audio mode on and off for you. See [Auto Music](#-auto-music).
- **🎧 One-Click Audio Mode:** Toggle audio-only playback instantly with a simple switch or keyboard shortcut (`Alt+Shift+A`) for Windows and `Option+Shift+A` for macOS.
- **📉 Smart Data Saving:** Automatically sets video quality to **144p** to minimize bandwidth consumption while keeping audio clear.
- **⚡ Less Buffering:** Switches quality through YouTube's player instead of its settings menu, so playback isn't interrupted by a stall each time. See [Smoother Switching](#-smoother-switching).
- **📊 Usage Statistics:** Track exactly how much data you've saved compared to 720p/1080p, along with your total listening time.
- **🎵 Audio Visualizer:** A stunning, animated visualizer replaces the blank video screen.
- **🎨 Custom Themes:** Choose from 6 beautiful gradient presets or customize the background with your own colors or images.
- **🔒 Privacy Focused:** All data and preferences are stored locally on your device. No external tracking.

## 🤖 Auto Music

Auto Music is on by default. Use **Auto-enable for music** in the popup to turn it off.

**A video counts as music if any of these is true:**

- YouTube labels it as an official music video or audio track
- It comes from an auto-generated "Artist - Topic" channel
- It was started from a Mix or radio
- It's part of an album or music-mix playlist

Live streams are always skipped.

**How it behaves:**

- The extension's icon shows an **AUTO** badge on tabs where it has switched on by itself.
- When you move to a video that isn't music, audio mode turns off and the picture comes back straight away.
- If you switch audio mode off on a detected song, that video is left alone.
- If you turn audio mode on yourself, it stays on for every video until you turn it off.
- A new video can wait up to 2 seconds while it's being checked, so a song doesn't start in full quality and then rebuffer. Videos that aren't music start as normal after the check.

## ⚡ Smoother Switching

The original extension ended up changing quality by clicking through YouTube's settings menu, which threw away the buffered video and caused a stall on every switch. This fork talks to YouTube's player directly instead:

- **Into audio mode:** YouTube is asked to stay at 144p and steps down at the next chunk, the way its own Auto quality does, so what's already buffered keeps playing.
- **Starting a song:** The 144p limit goes on before the song starts, so it doesn't begin in full quality and then rebuffer.
- **Back to video:** The picture returns straight away at your previous quality, or the best available up to 1080p, then quality goes back to Auto after 8 seconds. This can cause a brief rebuffer, which is the trade-off for not waiting on a blurry picture.
- **Settings menu as a last resort:** It's only used if YouTube ignores the request, and for the switch to 144p, only after 60 seconds.

## 🚀 Installation

This fork isn't on the Chrome Web Store, so it's installed manually in Developer Mode:

1.  Clone or download this repository.
2.  Open Chrome and go to `chrome://extensions/`.
3.  Enable **Developer mode** in the top-right corner.
4.  Click **Load unpacked**.
5.  Select the folder where you downloaded this repository.

## 📖 How to Use

For music, just play a song and audio mode will turn on by itself. To use audio mode on any other video:

1.  Open any YouTube video.
2.  Click the **YouTube Audio Mode Auto** icon in your browser toolbar.
3.  Toggle the switch to **On**.
4.  The video player will be hidden, and the visualizer will appear.
5.  To customize the look, click the **Settings (Gear)** icon in the popup.

## ⌨️ Shortcuts

- **Toggle Audio Mode:** `Alt` + `Shift` + `A` for Windows and `Option` + `Shift` + `A` for macOS.

## 📊 Statistics & Privacy

This extension calculates data savings based on average YouTube bitrate values:

- **144p (Audio Mode):** ~0.75 MB/min
- **720p (Standard):** ~18.75 MB/min
- **1080p (HD):** ~33.75 MB/min

**Privacy Policy:**
We do not collect any personal data. All preferences and usage statistics are stored locally on your machine using the Chrome Storage API. Auto Music works from the data YouTube has already loaded in the page, and nothing is sent anywhere. For more details, see [PRIVACY_POLICY.md](PRIVACY_POLICY.md).

## 🛠️ Development

### Project Structure

- `manifest.json` - Extension configuration (Manifest V3)
- `background.js` - Service worker for background tasks
- `content.js` - Main logic for handling the video player and visualizer DOM, including music detection (`classifyMusic()`)
- `inject.js` - Runs in the page's main world, where it can reach YouTube's player API and player data
- `popup.html/js/css` - The extension interface
- `overlay.css` - Styles for the visualizer overlay

### Tech Stack

- HTML5, CSS3, JavaScript (ES6+)
- Chrome Extension API (Manifest V3)

## 📝 License

This project is licensed under the MIT License.

---

_Original extension developed with ❤️ by [Ahmed Adli](https://github.com/devahmedadli). Auto Music fork by [Todd Kirby](https://github.com/tkirby)._
