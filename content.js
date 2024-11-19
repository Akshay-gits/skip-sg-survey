// Flag to control whether we should trigger events
let isSelecting = false;
let isWaitingForDynamicContent = false;

// Function to select the first option in all multiple-choice questions
function selectFirstOption() {
  // Prevent further selections if we are in the process of selecting options
  if (isSelecting) return;
  isSelecting = true;

  // Select all radio buttons on the page
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  
  // If no radio buttons are found, wait for dynamic content to load
  if (radioButtons.length === 0) {
    if (!isWaitingForDynamicContent) {
      console.log("No questions found. Waiting for dynamic content...");
      isWaitingForDynamicContent = true;
      // Set a timeout to check again after a short delay
      setTimeout(selectFirstOption, 1000);  // Retry every second
    }
    isSelecting = false;
    return;
  }

  // Group the radio buttons by their question (name attribute)
  const questions = {};

  radioButtons.forEach(radioButton => {
    const questionName = radioButton.name;  // Group by the 'name' attribute (question identifier)

    // If this question doesn't exist in the object, create an entry for it
    if (!questions[questionName]) {
      questions[questionName] = [];
    }

    // Push the radio button into the correct question group
    questions[questionName].push(radioButton);
  });

  // Now select the first option for each question
  for (const questionName in questions) {
    const options = questions[questionName];
    if (options.length > 0) {
      // Select the first option (radio button) for this group
      const firstOption = options[0];
      
      // Avoid selecting the same option again if it's already checked
      if (!firstOption.checked) {
        firstOption.checked = true;
        console.log(`First option selected for question: ${questionName}`);

        // Trigger the change event to mark the question as answered
        const event = new Event('change', { bubbles: true });
        firstOption.dispatchEvent(event);

        // Optionally, trigger the click event if needed
        const clickEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        });
        firstOption.dispatchEvent(clickEvent);
      }
    }
  }

  // Reset the waiting flag once the content is processed
  isWaitingForDynamicContent = false;

  // Re-enable event processing
  isSelecting = false;
}

// Call the function to automatically select the first option for all questions
selectFirstOption();

// Observe the DOM for changes (new questions being added dynamically)
const observer = new MutationObserver(() => {
  selectFirstOption(); // Try to select the first option whenever the DOM changes
});

// Start observing the document for added or removed nodes
observer.observe(document.body, { childList: true, subtree: true });
