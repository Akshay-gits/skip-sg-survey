// Get the toggle button and status display elements
const toggleButton = document.getElementById("toggleButton");
const statusText = document.getElementById("status");

// Initialize the button and status text based on the current extension state
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(['enabled'], (result) => {
    // Set the initial state (default to 'enabled' if not found)
    const isEnabled = result.enabled !== false;  // Default to 'true' if not stored
    updateButtonState(isEnabled);
  });
});

// Add click event listener to toggle the button
toggleButton.addEventListener("click", function () {
  // Send a message to the background script to toggle the extension state
  chrome.runtime.sendMessage({ action: "toggle" }, function (response) {
    const isEnabled = response.enabled;
    // Update the button's state based on the response
    updateButtonState(isEnabled);
  });
});

// Function to update the button appearance and text based on the state
function updateButtonState(isEnabled) {
  if (isEnabled) {
    toggleButton.classList.remove("off");
    toggleButton.classList.add("on");
    toggleButton.textContent = "ON";
    statusText.textContent = "Extension is ON";
    toggleButton.style.backgroundColor = "#4CAF50";  // Green for ON
  } else {
    toggleButton.classList.remove("on");
    toggleButton.classList.add("off");
    toggleButton.textContent = "OFF";
    statusText.textContent = "Extension is OFF";
    toggleButton.style.backgroundColor = "#f44336";  // Red for OFF
  }
}
