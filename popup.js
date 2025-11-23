document.addEventListener('DOMContentLoaded', function() {
      
    const healthFill = document.getElementById('healthFill');
    const dogSprite = document.getElementById('dog');
    
    const Mood = {
        HAPPY: 0,
        NEUTRAL: 1,
        SAD: 2
    }

    //updates the health bar width by getting the percentage when dividing current mins by max mins
    function updateHealthBar(currentSeconds, threshold, mood) {
        let percentage = (currentSeconds/ threshold) * 100;

        //Clamp values
        if (percentage > 100) percentage = 100;
        if (percentage < 0) percentage = 0;

        healthFill.style.width = percentage + '%';

        dogSprite.classList.remove('neutral', 'sad');

        if (mood === Mood.HAPPY) {
            
        }

        else if (mood === Mood.NEUTRAL) {
            dogSprite.classList.add('neutral');
        }

        else if (mood >= Mood.SAD) {
            dogSprite.classList.add('sad');
        }
    }

    chrome.storage.local.get(['instagramSeconds', 'thresholdSeconds', 'currentMood'], (result) => {
        const secs = result.instagramSeconds || 0;
        const thresh = result.thresholdSeconds || 60;
        const mood = result.currentMood !== undefined ? result.currentMood : Mood.HAPPY;
        updateHealthBar(secs, thresh, mood);
    });

    chrome.storage.onChanged.addListener((changes, namespace) => {
        chrome.storage.local.get (['instagramSeconds', 'thresholdSeconds', 'currentMood'], (result) => {
            const secs = result.instagramSeconds || 0;
            const thresh = result.thresholdSeconds || 60;
            const mood = result.currentMood !== undefinded ? result.currentMood : Mood.HAPPY;
            updateHealthBar(secs, thresh, mood);
        });
    });
});