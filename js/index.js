document.addEventListener('DOMContentLoaded', function(e){
const url = 'http://localhost:3000/monsters'
const backButton = document.getElementById('back')
const frontButton = document.getElementById('forward')
const newMonsterName = document.querySelector('#name')
const newMonsterAge = document.querySelector('#age') 
const newMonsterDescritption = document.querySelector('#descritption') 
const form = document.querySelector('form')
let timesClicked = 0 

function displayMonsters(array){
        const monstersContainer = document.querySelector('#monster-container')
        monstersContainer.innerHTML = ' '
        array.forEach(monster => {
        const oneMonster = document.createElement('div')
        oneMonster.innerHTML += `<br>
        <h2>Monster Name: ${monster.name}</h2>
        <h3>Monster Age: ${monster.age}</h3>
        <p>Monster Description: ${monster.description}</p><br>
        `
        monstersContainer.appendChild(oneMonster)})
}


fetch(url)
.then(res => res.json())
.then(monsters => {
    const firstPageMonsters = monsters.slice(1,50)
    const secondPageMonsters = monsters.slice(50, 100) 
    const thirdPageMonsters = monsters.slice(100,150)
    const fourthPageMonsters = monsters.slice(150, 200)
    const fifthPageMonsters = monsters.slice(200, 250)
    pagesArray = [firstPageMonsters, secondPageMonsters, thirdPageMonsters, fourthPageMonsters, fifthPageMonsters]
    displayMonsters(pagesArray[0])})

   backButton.addEventListener('click', function(e){
    timesClicked -= 1 
    if (timesClicked === 0 ){
 displayMonsters(pagesArray[0])
    } else if (timesClicked === 1){
        displayMonsters(pagesArray[1])
    } else if (timesClicked === 2){
        displayMonsters(pagesArray[2])
    } else if (timesClicked === 3){
        displayMonsters(pagesArray[3])
    }
   })

   frontButton.addEventListener('click', function(e){
       timesClicked += 1 
       if (timesClicked === 1 ){
    displayMonsters(pagesArray[1])
       } else if (timesClicked === 2 ){
           displayMonsters(pagesArray[2])
       } else if (timesClicked === 3){
           displayMonsters(pagesArray[3])
       } else if (timesClicked === 4){
           displayMonsters(pagesArray[4])
       }
})


document.addEventListener('submit', function(e){
    e.preventDefault()
    console.log(newMonsterAge.value)
    fetch(url,
    {
    method: 'POST',
    headers: 
    {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
    body: JSON.stringify({
      name: newMonsterName.value,
      age: newMonsterAge.value,
      description: newMonsterDescritption.value
    })
   
})
form.reset()

})

})