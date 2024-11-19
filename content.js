
let isSelecting = false;
let isWaitingForDynamicContent = false;


function selectFirstOption() {
  if (isSelecting) return;
  isSelecting = true;


  const radioButtons = document.querySelectorAll('input[type="radio"]');
  

  if (radioButtons.length === 0) {
    if (!isWaitingForDynamicContent) {
      console.log("No questions found..");
      isWaitingForDynamicContent = true;
      setTimeout(selectFirstOption, 1000);  
    }
    isSelecting = false;
    return;
  }

  const questions = {};

  radioButtons.forEach(radioButton => {
    const questionName = radioButton.name;  
    if (!questions[questionName]) {
      questions[questionName] = [];
    }

    questions[questionName].push(radioButton);
  });


  for (const questionName in questions) {
    const options = questions[questionName];
    if (options.length > 0) {
      const firstOption = options[0];
      

      if (!firstOption.checked) {
        firstOption.checked = true;
        console.log(`First option selected for question: ${questionName}`);

        const event = new Event('change', { bubbles: true });
        firstOption.dispatchEvent(event);
        const clickEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        });
        firstOption.dispatchEvent(clickEvent);
      }
    }
  }

 
  isWaitingForDynamicContent = false;
  isSelecting = false;
}


selectFirstOption();


const observer = new MutationObserver(() => {
  selectFirstOption(); 
});


observer.observe(document.body, { childList: true, subtree: true });
