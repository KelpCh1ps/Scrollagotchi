const Mood = {
        HAPPY: 0,
        NEUTRAL: 1,
        SAD: 2
    }

chrome.storage.local.get({thresholdSeconds : 60, lastInstagramCheck: Date.now(), instagramSeconds : 0, isOnInstagram : false, currentMood : Mood.NEUTRAL, isDead : false}, (data) => 
{
    if(data.isDead === true)
    {
        return;
    }
    const curTime = Date.now();
    if(data.isOnInstagram === true)
    {
        let igs = ((curTime - data.lastInstagramCheck) / 1000) + data.instagramSeconds;
        chrome.storage.local.set({ instagramSeconds: igs });
        if(igs >= data.thresholdSeconds)
        {
            igs -= data.thresholdSeconds;
            chrome.storage.local.set({ instagramSeconds: igs });
            const currMood = data.currentMood;
            if(currMood > Mood.HAPPY)
            {
                chrome.storage.local.set({ currentMood: currMood - 1});
                chrome.storage.local.set({ timeSinceLastStatus: Date.now() });
            }
        }
        chrome.storage.local.set({ lastInstagramCheck: curTime });
    }
});




document.addEventListener('DOMContentLoaded', function() 
{
      
    const healthFill = document.getElementById('healthFill');
    const dogSprite = document.getElementById('dog');
    
    

    let localState = {
        instagramSeconds: 0,
        thresholdSeconds: 60,
        currentMood: Mood.HAPPY,
        currentHealth: 100,
        lastInstagramCheck: Date.now(),
        isOnInstagram: false,
        isDead: false
    };
    
    function render () {

        if(localState.isDead)
        {   
            dogSprite.classList.remove('neutral', 'sad');
            dogSprite.classList.add('dead');
            healthFill.style.width = '0';
            return;
        }

        const now = Date.now();

        let prevHealth = localState.currentHealth;

        const elapsedSeconds = (now - localState.lastInstagramCheck) / 1000;

        let displaySeconds = localState.instagramSeconds;

        if (localState.isOnInstagram) {
            displaySeconds += elapsedSeconds;
        } else {
            displaySeconds -= elapsedSeconds;
        }

        
        dogSprite.classList.remove('neutral', 'sad');

        if(localState.currentMood === Mood.NEUTRAL)
        {
            dogSprite.classList.add('neutral');
        }
        else if (localState.currentMood === Mood.SAD) {
            dogSprite.classList.add('sad');
            localState.currentHealth -= 0.01;
            if (localState.currentHealth <= 0) {
                localState.currentHealth = 0;
                localState.isDead = true; // <- update local state immediately
                chrome.storage.local.set({ isDead: true, currentHealth: 0 });
            }
        }
        else
        {
           localState.currentHealth += 0.1;
            if (localState.currentHealth > 100) localState.currentHealth = 100;
            
        }

        healthFill.style.width = localState.currentHealth + '%';

        if (localState.currentHealth !== prevHealth) {
        chrome.storage.local.set({ currentHealth: localState.currentHealth });

        }
    }



    function updateData(result) {
        localState.instagramSeconds = result.instagramSeconds || 0;
        localState.thresholdSeconds = result.thresholdSeconds || 60;
        localState.currentMood = result.currentMood !== undefined ? result.currentMood : Mood.HAPPY;
        localState.currentHealth = result.currentHealth !== undefined ? result.currentHealth : 100;
        localState.lastInstagramCheck = result.lastInstagramCheck || Date.now();
        localState.isOnInstagram = result.isOnInstagram || false;
        localState.isDead = result.isDead || false;
        render();
    }

    const keys = ['instagramSeconds', 'thresholdSeconds', 'currentMood', 'currentHealth', 'lastInstagramCheck', 'isOnInstagram', 'isDead'];

    setInterval(render, 100);
    chrome.storage.local.get(keys, updateData);
   
    
    chrome.storage.onChanged.addListener((changes, namespace) => {
        chrome.storage.local.get(keys, updateData);
    });
});