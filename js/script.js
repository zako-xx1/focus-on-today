
const checkBoxList = document.querySelectorAll('.custom-checkbox')
const inputFields = document.querySelectorAll('.goal-input')
const errorLabel = document.querySelector('.error-label')
const progressBar = document.querySelector('.progress-bar')
const progressLabel = document.getElementById('progress-label')
const comment = document.getElementById('comment')
const progressValue = document.querySelector('.progress-value')

const allQuotes = [

  'Raise the bar by completing your goals!',
  'Well begun is half done!',
  'Just a step away, keep going!',
  'Whoa! You just completed all the goals, time for chill :) ',
  '“hurrah! you are completed all goals :)”'


]
const allComments = [
  '“Move one step ahead, today!”',
  '“Keep Going, You’re making great progress!”',
  'just one goal is remaining :)”',
  '“hurrah! you are completed all goals :)”',
    'Whoa! You just completed all the goals, time for chill :) ',

]
//get tiem into local storage
// let allGoals = JSON.parse(localStorage.getItem('todayGoals')) || {
//   first : {
//     goal: '',
//     completed:false 
//   },
//    second : {
//     goal: '',
//     completed:false 
//   },
//    third : {
//     goal: '',
//     completed:false 
//   }
// };
let allGoals = JSON.parse(localStorage.getItem('todayGoals')) || {}
//check how many complete
let completedGoalsCount = Object.values(allGoals).filter(
  (goal) => goal.completed
).length
progressValue.style.width = `${completedGoalsCount / inputFields.length * 100}%`;
progressValue.firstElementChild.textContent = `${completedGoalsCount}/${inputFields.length} completed`;
progressLabel.innerText = allQuotes[completedGoalsCount]
comment.innerText = allComments[completedGoalsCount]

// loop in array  to  get value checkbox
checkBoxList.forEach((checkbox) => {
  //check all input are full not empty
  checkbox.addEventListener('click', (e) => {
    const allGoalsAdded = [...inputFields].every((input) => {
      return input.value.trim() !== ''; // check input field is not empty
    })
    //toggle add class  and check is  checkbox isselect
    if (allGoalsAdded) {
      checkbox.parentElement.classList.toggle('completed');
      errorLabel.style.display = 'none';
      //checkbox in local storage
      const inputID = checkbox.nextElementSibling.id;
      allGoals[inputID].completed = !allGoals[inputID].completed;
      completedGoalsCount = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length;
     progressValue.style.width = `${(completedGoalsCount / inputFields.length) * 100}%`;


      progressValue.firstElementChild.textContent = `${completedGoalsCount}/${inputFields.length} completed`;
      progressLabel.textContent = allQuotes[completedGoalsCount]
      comment.innerText = allComments[completedGoalsCount]

      localStorage.setItem('todayGoals', JSON.stringify(allGoals));
    } else {
      errorLabel.style.display = 'block';
    }
  })
})
//arraay looop in input to get one by one input
inputFields.forEach((input) => {
  // local to ui input value
  if (allGoals[input.id]) {
    input.value = allGoals[input.id].goal;
    if (allGoals[input.id].completed) {
      input.parentElement.classList.add('completed')
    }
  }
  //if input is focus then error is hide
  input.addEventListener('focus', () => {
    errorLabel.style.display = 'none';

  })
  //if local storage have input value
  input.addEventListener('input', (e) => {
    if (allGoals[input.id]) {
      if (allGoals[input.id].completed) {
        input.value = allGoals[input.id].goal;
        input.setAttribute('readonly', true);
        input.style.cursor = "url('../images/cursor.svg'), not-allowed";
      }
    }
    // allGoals[input.id] = {
    //   goal: input.value,
    //   completed: false
    // }
    if (allGoals[input.id]) {
      allGoals[input.id].goal = input.value
    } else {
      allGoals[input.id] = {
        goal: input.value,
        completed: false,
      }
    }
    // setitem into localStorage
    localStorage.setItem('todayGoals', JSON.stringify(allGoals));
  });
});






