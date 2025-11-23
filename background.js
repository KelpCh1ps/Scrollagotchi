const Mood = Object.freeze({
  HAPPY: 0,
  NEUTRAL: 1,
  SAD: 2
});


chrome.runtime.onInstalled.addListener(() => 
{
    chrome.storage.local.set({
        tamagachiName: 'DOG',
        instagramSeconds: 0, // In seconds
        thresholdSeconds: 60, // In seconds
        secondsUntilMoodDrop: 60, // In seconds
        lastInstagramCheck: Date.now(),
        currentMood: Mood.HAPPY,
        currentHealth: 100,
        isDead: false,
        isOnInstagram: false

    });
});
/*
// Declaring and initializing default values
/////////////////////////////////////////////
let tamagachiName = 'DOG';
let instagramSeconds = 0;
let thresholdSeconds = 60;
let secondsUntilMoodDrop = 60;
let lastInstagramCheck = Date.now();
let currentMood = Mood.HAPPY;
let currentHealth = 100;
let isDead = false;
//////////////////////////////////////////////
*/

chrome.storage.local.get(['currentHealth'], (data) => 
{
    const currentHealth = data.currentHealth;
    if(currentHealth <= 0)
    {
        chrome.storage.local.set({ isDead: true });
        // Deletes itself
    }
});

/* Timer needed for: 
    -Reduce health if mood is sad
    -Check instagram time ASAP and add it to the instagram Seconds
    -If tabbed out of instagram, stop counting instagram time and set timer for mood drop
    -While on instagram and mood drop timer is below 60, increment that too
    - Whenever you tab out of instagram, set a timer for 30 seconds, and when it hits, 
      set instagramSeconds to 0
*/


//  Checks when I switch tabs and logs the URL of the active tab, as well as initializing tab
chrome.tabs.onActivated.addListener(() => 
{
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => 
    {
        const tab = tabs[0];
        if (!tab || !tab.url) return;
        console.log('Active tab URL:', tab.url);
        if (tab.url.includes('instagram.com')) 
        {
            chrome.alarms.clear('resetInstagramTimer');
            chrome.storage.local.get({isOnInstagram : false}, (data) => 
            {       
                if(data.isOnInstagram === false)
                {
                    chrome.storage.local.set({  lastInstagramCheck: Date.now() });
                }
            });
            chrome.alarms.clear('moodDropTimer');
            chrome.storage.local.set({  isOnInstagram: true });
        }
        else
        {
            chrome.storage.local.get({lastInstagramCheck: Date.now(), instagramSeconds : 0, isOnInstagram : false}, (data) => 
            {
                const curTime = Date.now();
                const igs = ((curTime - data.lastInstagramCheck) / 1000) + data.instagramSeconds;
                if(data.isOnInstagram === true)
                {
                     chrome.storage.local.set({ instagramSeconds: igs });
                     chrome.storage.local.set({ isOnInstagram: false });
                }
                 chrome.storage.local.set({  lastInstagramCheck: curTime });
            });
            // Stop instagram timer and start mood drop timer
            chrome.alarms.create('moodDropTimer', { periodInMinutes: 1 }); // 60 seconds
            chrome.alarms.create('resetInstagramTimer', { delayInMinutes: 0.5 }); // 30 seconds
        }
    });
});
// Checks if you change URL in the same tab
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) =>                  
{
    if (!changeInfo.url) return;
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => 
    {
        const tab = tabs[0];
        if (!tab || !tab.url) return;
        console.log('Active tab URL:', tab.url);
        if (tab.url.includes('instagram.com')) 
        {
            chrome.alarms.clear('resetInstagramTimer');
            chrome.storage.local.get({isOnInstagram : false}, (data) => 
            {       
                if(data.isOnInstagram === false)
                {
                    chrome.storage.local.set({  lastInstagramCheck: Date.now() });
                }
            });
            chrome.alarms.clear('moodDropTimer');
            chrome.storage.local.set({  isOnInstagram: true });
        }
        else
        {
            chrome.storage.local.get({lastInstagramCheck: Date.now(), instagramSeconds : 0,  isOnInstagram : false}, (data) => 
            {
                const curTime = Date.now();
                const igs = ((curTime - data.lastInstagramCheck) / 1000) + data.instagramSeconds;
                if(data.isOnInstagram === true)
                {
                     chrome.storage.local.set({ instagramSeconds: igs });
                     chrome.storage.local.set({ isOnInstagram: false });
                }
                chrome.storage.local.set({  lastInstagramCheck: curTime });
            });
            // Stop instagram timer and start mood drop timer
            chrome.alarms.create('moodDropTimer', { periodInMinutes: 1 }); // 60 seconds
            chrome.alarms.create('resetInstagramTimer', { delayInMinutes: 0.5 }); // 30 seconds
        }
    });
});

chrome.alarms.onAlarm.addListener((alarm) => 
{
    if (alarm.name === 'moodDropTimer')
    {
        chrome.storage.local.get(['currentMood'], (data) => 
        {
             const currentMood = data.currentMood;
            if (currentMood < Mood.SAD)
            {
                chrome.storage.local.set({ currentMood: currentMood + 1 });
            }
        });
    }
    else if (alarm.name === 'resetInstagramTimer')
    {
        chrome.storage.local.set({ instagramSeconds: 0 });
        //instagramSeconds = 0;
    }
});

