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
	# ✨ Scrollagotchi ✨

	<p align="center">
	  <img src="Assets/Scrollagotchi_Logo.png" alt="Scrollagotchi Logo" width="240" />
	</p>

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

	### Gameplay Mechanics (clear & concise)

	- **Threshold (time on Instagram)** — The extension accumulates your Instagram time in `instagramSeconds`. When the accumulated time meets or exceeds `thresholdSeconds` (default 60s), your pet's mood is reduced by one level.

	- **Recovery (off-Instagram)** — While you are not on Instagram, the background alarm (`moodDropTimer`) and logic in `background.js` gradually adjust mood over time toward a happier state. Leaving Instagram also triggers a short timer that can reset the Instagram counter.

	- **Health & Game Over** — When the pet is in the **Sad** mood it loses health over time (reduced each render tick). If health reaches `0`, the pet is marked `isDead: true` and the game ends.

	- **Timer reset behavior** — A `resetInstagramTimer` alarm clears the accumulated Instagram timer after a short delay (default 30s after leaving Instagram), preventing immediate re-penalization for short visits.

	- **Persistence** — Game state (mood, health, instagramSeconds, lastInstagramCheck, isOnInstagram, etc.) is persisted in `chrome.storage.local` so it survives browser restarts.

	Simple mapping of relevant stored keys:

	```text
	instagramSeconds      # accumulated seconds on Instagram
	thresholdSeconds      # seconds before a mood drop (default 60)
	currentMood           # 0=Happy, 1=Neutral, 2=Sad
	currentHealth         # 0-100 health value
	lastInstagramCheck    # timestamp used to compute elapsed time
	isOnInstagram         # boolean flag while active on instagram.com
	isDead                # true when health <= 0
	```

	---

	## 🎨 File Structure

	```
	Scrollagotchi/
	├── manifest.json          # Extension configuration
	├── popup.html             # UI layout
	├── popup.css              # Styling & animations
	├── popup.js               # Frontend logic & rendering
	├── background.js          # Event listeners & state management
	├── contentScript.js       # Page interaction (if needed)
	└── Assets/
		├── Scrollagotchi_Logo.png
		├── Scrollagotchi_Sprites.png
		├── Scrollagotchi_Neutral.png
		├── Scrollagotchi_Sad.png
		├── Scrollagotchi_Isolated.png
		└── Tombstone.png
	```

	---

	## 🔧 Technologies Used

	- **Chrome Extension API** - For tab monitoring and local storage
	- **Vanilla JavaScript** - Core logic
	- **CSS3** - Animations and retro styling
	- **Pixel Art** - Handcrafted sprites (that's what makes it beautiful!)

	---

	## 💡 Customization

	Feel free to tweak these values in `background.js` to adjust gameplay difficulty:

	```javascript
	thresholdSeconds: 60,        // Instagram time before mood drops
	secondsUntilMoodDrop: 30,   // Inactivity before mood improves
	currentHealth: 100,          // Starting health value
	```

	---

	## 🐛 Troubleshooting

	**Extension not detecting Instagram?**
	- Ensure the extension has permission to access `instagram.com`
	- Refresh the extension from the Chrome extensions page

	**Mood not changing?**
	- Check that your extension storage is enabled (Settings → Privacy → Site Settings → Cookies)
	- Verify the background script is running (check Dev Tools)

	**Pet looks pixelated in a bad way?**
	- CSS `image-rendering: pixelated` ensures proper pixel art scaling
	- If it looks blurry, try zooming in on the popup

	---

	## 🎯 Future Ideas

	- 🌈 Multiple pet skins and customization
	- 🏆 Achievement system & leaderboards
	- 💾 Cloud save functionality
	- 🌍 Multi-site tracking (YouTube, TikTok, etc.)
	- 🎵 Sound effects & background music
	- 🐕‍🦺 Pet naming and personality traits

	---

	## 📝 License

	MIT License - Feel free to use, modify, and distribute!

	---

	## 🎉 Enjoy Your Scrollagotchi!

	*Remember: Your digital companion is always watching. Scroll responsibly.* 👀✨

	---

	**Made with 💚 by [KelpCh1ps](https://github.com/KelpCh1ps)**
