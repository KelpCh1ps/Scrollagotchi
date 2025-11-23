const Mood = Object.freeze({
  HAPPY: "happy",
  NEUTRAL: "neutral",
  STRESSED: "sad",
});

chrome.runtime.onInstalled.addListener(() => 
{
    chrome.storage.local.set({
        tamagachiName: 'DOG',
        instagramMinutes: 0,
        currentMood: Mood.HAPPY,

    });
});


//  Checks when I switch tabs and logs the URL of the active tab, as well as initializing tab
chrome.tabs.onActivated.addListener(() => 
{
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => 
    {
        const tab = tabs[0];
        console.log('Active tab URL:', tab.url);

        if (tab.url.includes('instagram.com')) 
        {
            // Initialize or perform actions for Instagram tab
        }
    });
});
// Checks if 
chrome.tabs.onUpdated.addListener(() =>                  
{
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => 
    {
        const tab = tabs[0];
        console.log('Active tab URL:', tab.url);
    });
});

