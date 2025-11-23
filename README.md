# ✨ Scrollagotchi ✨

> *A delightfully adorable digital companion that judges your Instagram habits—with style*

---

## 🎮 About Scrollagotchi

**Scrollagotchi** is a Chrome extension that brings your beloved Tamagotchi-inspired pet to life. Watch your fluffy companion's mood shift based on your Instagram scrolling habits. Spend too much time on Instagram, and your pet becomes sad. Keep your focus sharp, and your pet stays happy and healthy.

It's a whimsical blend of nostalgia and modern digital wellness—your personal companion monitoring your screen time with an adorable pixelated face.

---

## 🌟 Features

✨ **Mood-Based Companion System**
- Your pet cycles through three moods: **Happy** 😊 → **Neutral** 😐 → **Sad** 😢
- Moods change based on your Instagram activity

💚 **Dynamic Health Bar**
- Visual health indicator that depletes when your pet is sad
- Recovers when your pet is happy
- Watch the gradient change from red → yellow → green

📱 **Instagram Activity Tracking**
- Automatically detects when you switch to Instagram
- Accumulates time spent on the platform
- Applies "damage" to your pet's mood after threshold is met

🎨 **Pixelated Aesthetic**
- Charming retro pixel art sprites
- Smooth animations and transitions
- Retro-inspired UI with that nostalgic Tamagotchi feel

⏱️ **Smart Mood Decay**
- Mood naturally degrades over time when away from Instagram
- Encouraging you to take breaks and refocus

---

## 🚀 Getting Started

### Installation

1. **Clone or download** this repository to your local machine
	```bash
	git clone https://github.com/KelpCh1ps/Scrollagotchi.git
	cd Scrollagotchi
	```

2. **Open Chrome Extensions** page
	- Navigate to `chrome://extensions/` in your Chrome browser
	- Enable **Developer mode** (toggle in top-right corner)

3. **Load the extension**
	- Click **Load unpacked**
	- Select the `Scrollagotchi` directory
	- Your extension is now active! 🎉

4. **Open the popup**
	- Click the extension icon in your Chrome toolbar
	- Your Scrollagotchi companion appears!

---

## 📊 How It Works

### The Mood System

| State | Appearance | Health Impact |
|-------|-----------|---------------|
| **Happy** 😊 | Animated walk cycle | +0.1 health/frame |
| **Neutral** 😐 | Calm expression | No change |
| **Sad** 😢 | Crying with tears | -0.1 health/frame |

### Gameplay Mechanics

- **Threshold**: After accumulating 60+ seconds on Instagram, your mood drops one level\n- **Recovery**: Staying off Instagram allows your mood to naturally improve\n- **Game Over**: Your pet's health reaches 0 and the game ends\n- **Time Decay**: 30 seconds after leaving Instagram, the timer resets\n\n---\n\n## 🎨 File Structure\n\n```\nScrollagotchi/\n├── manifest.json          # Extension configuration\n├── popup.html             # UI layout\n├── popup.css              # Styling & animations\n├── popup.js               # Frontend logic & rendering\n├── background.js          # Event listeners & state management\n├── contentScript.js       # Page interaction (if needed)\n└── Assets/\n    ├── Scrollagotchi_Sprites.png\n    ├── Scrollagotchi_Neutral.png\n    └── Scrollagotchi_Sad.png\n```\n\n---\n\n## 🔧 Technologies Used\n\n- **Chrome Extension API** - For tab monitoring and local storage\n- **Vanilla JavaScript** - Core logic\n- **CSS3** - Animations and retro styling\n- **Pixel Art** - Handcrafted sprites (that's what makes it beautiful!)\n\n---\n\n## 💡 Customization\n\nFeel free to tweak these values in `background.js` to adjust gameplay difficulty:\n\n```javascript\nthresholdSeconds: 60,        // Instagram time before mood drops\nsecondsUntilMoodDrop: 30,   // Inactivity before mood improves\ncurrentHealth: 100,          // Starting health value\n```\n\n---\n\n## 🐛 Troubleshooting\n\n**Extension not detecting Instagram?**\n- Ensure the extension has permission to access `instagram.com`\n- Refresh the extension from the Chrome extensions page\n\n**Mood not changing?**\n- Check that your extension storage is enabled (Settings → Privacy → Site Settings → Cookies)\n- Verify the background script is running (check Dev Tools)\n\n**Pet looks pixelated in a bad way?**\n- CSS `image-rendering: pixelated` ensures proper pixel art scaling\n- If it looks blurry, try zooming in on the popup\n\n---\n\n## 🎯 Future Ideas\n\n- 🌈 Multiple pet skins and customization\n- 🏆 Achievement system & leaderboards\n- 💾 Cloud save functionality\n- 🌍 Multi-site tracking (YouTube, TikTok, etc.)\n- 🎵 Sound effects & background music\n- 🐕‍🦺 Pet naming and personality traits\n\n---\n\n## 📝 License\n\nMIT License - Feel free to use, modify, and distribute!\n\n---\n\n## 🎉 Enjoy Your Scrollagotchi!\n\n*Remember: Your digital companion is always watching. Scroll responsibly.* 👀✨\n\n---\n\n**Made with 💚 by [KelpCh1ps](https://github.com/KelpCh1ps)**
