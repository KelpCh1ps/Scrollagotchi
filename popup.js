document.addEventListener('DOMContentLoaded', function() {
  
    const dogElement = document.getElementById('dog');
    const statusElement = document.getElementById('statusMessage');
  
    // happiness score (temp)
    let happiness = 0;
  
    // gain happiness from clicking dog
    dogElement.addEventListener('click', function() {
      happiness++;
      
      statusElement.textContent = "Bark! Happy: " + happiness;
      statusElement.style.color = "#FFD700"; // Gold color
  
      // Make the dog run fast
      dogElement.style.animationDuration = "0.2s";
  
      // Reset back to normal after 1 second
      setTimeout(() => {
        statusElement.textContent = "Status: Idle";
        statusElement.style.color = "#4CAF50"; // Back to Green
        dogElement.style.animationDuration = "0.8s"; // normal speed
      }, 1000);
    });
  
    // --- DEBUGGING ---
    console.log("Scrollagotchi Popup Loaded successfully.");
  });