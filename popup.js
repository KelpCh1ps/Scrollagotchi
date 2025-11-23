document.addEventListener('DOMContentLoaded', function() {
      
    const healthFill = document.getElementById('healthFill');
    const dogSprite = document.getElementById('dog');
    
    const Mood = {
        HAPPY: 0,
        NEUTRAL: 1,
        SAD: 2
    }

    let localState = {
        instagramSeconds: 0,
        thresholdSeconds: 60,
        currentMood: Mood.HAPPY,
        lastInstagramCheck: Date.now(),
        isOnInstagram: false
    };
    
    function render () {
        const now = Date.now();

        const elapsedSeconds = (now - localState.lastInstagramCheck) / 1000;

        let displaySeconds = localState.instagramSeconds;

        if (localState.isOnInstagram) {
            displaySeconds += elapsedSeconds;
        } else {
            displaySeconds -= elapsedSeconds;
        }

        let percentage = (displaySeconds / localState.thresholdSeconds) * 100;

        if (percentage > 100) percentage = 100;
        if (percentage < 0) percentage = 0;

        healthFill.style.width = percentage + '%';

        dogSprite.classList.remove('neutral', 'sad');
        const mood = localState.currentMood;

        if (mood === Mood.NEUTRAL) {
            dogSprite.classList.add('neutral');
        } else if (mood === Mood.SAD) {
            dogSprite.classList.add('sad');
        }
    }

    function updateData(result) {
        localState.instagramSeconds = result.instagramSeconds || 0;
        localState.thresholdSeconds = result.thresholdSeconds || 60;
        localState.currentMood = result.currentMood !== undefined ? result.currentMood : Mood.HAPPY;
        localState.lastInstagramCheck = result.lastInstagramCheck || Date.now();
        localState.isOnInstagram = result.isOnInstagram || false;
        render();
    }

    const keys = ['instagramSeconds', 'thresholdSeconds', 'currentMood', 'lastInstagramCheck', 'isOnInstagram'];

    setInterval(render, 100);

    chrome.storage.local.get(keys, updateData);

    chrome.storage.onChanged.addListener((changes, namespace) => {
        chrome.storage.local.get(keys, updateData);
    });
});