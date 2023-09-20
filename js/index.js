document.addEventListener('DOMContentLoaded', () => {

  //global variables
  let page = 1;
  let monstContainer = document.querySelector('#monster-container');
  const forwardButton = document.querySelector('#forward')
  const backButton = document.querySelector('#back');
  const formContainer = document.querySelector('#create-monster')
  let form; //used later to access form


//function to create new div and append elements
function appendMonster(monster) {
  const div = document.createElement('div')

  const h2 = document.createElement('h2')
  h2.textContent = monster.name

  const h4 = document.createElement('h4')
  h4.textContent = `Age: ${monster.age}`

  const p = document.createElement('p')
  p.textContent = `Bio: ${monster.description}`

  div.append(h2, h4, p)
  monstContainer.appendChild(div)
}

//load x page of monsters
const loadMonsters = () => {
  fetch(`http://localhost:3000/monsters/?_limit=50/&_page=${page}`)
  .then(resp => resp.json())
  .then((monsterData) => {
    monsterData.forEach((monster) => appendMonster(monster))
  })
  .catch(error => alert(error))
}

//clear div element
function clearMonstContainer() {
  let child = monstContainer.lastElementChild
  while (child) {
    monstContainer.removeChild(child)
    child = monstContainer.lastElementChild
  }
}

//Add event listener to forward button
const addForwardEventListener = () => {
  forwardButton.addEventListener('click', () => {
    page += 1;
    clearMonstContainer();
    loadMonsters();
  })
}

//Add event listener to back button
  const addBackEventListener = () => {
    backButton.addEventListener('click', () => {
      if (page !== 1) {
        page --;
      }
      else {
        alert('No monsters here :/')
      }
      clearMonstContainer();
      loadMonsters();
    })
  }

//create new submit elements
const newForm = () => {
  form = document.createElement('form')
  form.id = "monster-form"

  const inputId = document.createElement('input')
  inputId.id = "name"
  inputId.placeholder = "Name"

  const inputAge = document.createElement('input')
  inputAge.id = "age"
  inputAge.placeholder = "Age"

  const inputDesc = document.createElement('input')
  inputDesc.id = 'description'
  inputDesc.placeholder = 'Description'

  const button = document.createElement('button')
  button.innerText = "Create"

  form.append(inputId, inputAge, inputDesc, button)
  formContainer.append(form)
}

  //submit form with POST fetch
const postForm = () => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    let postData = event.target

    fetch('http://localhost:3000/monsters', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name": postData.name.value,
        "age": postData.age.value,
        "description": postData.description.value
      })
    })
    .then(resp => resp.json())
    .then((data) => console.log(data))
    .catch(error => alert(error))
  form.reset()
  })
}



//call functions
newForm();
loadMonsters();
addForwardEventListener();
addBackEventListener();

postForm();
})
