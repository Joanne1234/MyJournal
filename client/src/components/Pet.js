import React, {useState, useEffect} from 'react';
import { 
    makeNewPost, 
    patch, 
    getObject
} from '../fetch/generalFetch';

const petStyle = {
    alignContent: 'center',
    margin: 5,
    padding: 5,
    outline: "thick solid lightcoral"
}
function differenceInDays(day1, day2) {
    const date1 = new Date (day1)
    const date2 = new Date (day2)
    const days = Math.round(Math.abs(date1 - date2) / (1000 * 3600 * 24))
    if (Number.isInteger(days)) {
        return days
    }
    return 0
}

async function submitPetName(postUrl, name, setChange) {
    const newName = {
        name: name
    }
    postUrl+= "/name"
    const newPet = await patch(postUrl, newName)
    if (newPet) {
        setChange(newPet)
        return newPet
    }
}

async function submitPetFood(postUrl, food, setChange) {
    const feed = {
        food: food
    }
    const newPet = await makeNewPost(postUrl, feed)
    if (newPet) {
        setChange(newPet)
        return newPet
    }
}

const PetNameInput = ({petUrl, name, setName, setChange}) => {
    return (
      <div style={petStyle}>
      <input type="text" onChange={(e) => {
        setName(e.target.value)
      }}/>
      <button 
        title = "Edit"
        onClick={async (e) => {
            e.preventDefault()
            submitPetName(petUrl, name, setChange)
        }}
        > 
          Change name 
        </button>
      </div>
    )
}

const ViewPet = ({petUrl}) => {
    const [name, setName] = useState("")
    const [level, setLevel] = useState(0)
    const [health, setHealth] = useState(100)
    const [days, setDays] = useState(0)
    const [foodToLevelUp, setFoodToLevelUp] = useState(0)
    const [overallFoodIntake, setOverallFoodIntake] = useState(0)
    const [foodNextLevel, setFoodNextLevel] = useState(1)
    const [newName, setNewName] = useState(name)
    const [pet, setPet] = useState({})
    const [reqData, setReqData] = useState("")
    const [feed, setFeed] = useState(0)
    try {
        //  get pet info from backend API
        async function getPet(url) {
            const pet = await getObject(url)
            // update pet object
            setPet(pet)
            console.log(url, pet)
            const date = pet.dateCreated
            setName(pet.name)
            setLevel(pet.level)
            setHealth(pet.health)
            setFoodToLevelUp(pet.foodRequiredToLevelUp)
            setDays(differenceInDays(date, Date.now()))
            setOverallFoodIntake(pet.overallFoodIntake)
            setFoodNextLevel(pet.overallFoodIntake + pet.foodRequiredToLevelUp)
        }
        useEffect(() => {
            setPet({})
            getPet(petUrl);
        }, [reqData])
    } catch (error) {
        console.log(error)
    }
    return (
      <div style={petStyle}>
          <p>{name}</p>
          <input 
            type="text" 
            value={newName}
            onChange={(e) => {
              setNewName(e.target.value)
          }}/>
          <button 
            title = "Edit"
            onClick={async (e) => {
                e.preventDefault()
                submitPetName(petUrl, newName, setReqData)
            }}
          > 
            Change name 
          </button>
          <p>Level: {level}  {overallFoodIntake}/{foodNextLevel} </p>
          <p>Health: {health} </p>
          <p>Food To Level Up: {foodToLevelUp} </p>
          <p>Age: {days} days</p>
          <p> Feed {name}: 
            <input 
              type="text" 
              pattern="[0-9]*" 
              onChange={(e) => {
                setFeed(Number(e.target.value))
              }}/>
            <button 
              title = "Feed"
              onClick={async (e) => {
                e.preventDefault()
                submitPetFood(petUrl, feed, setReqData)
              }}
            > 
              Feed
            </button>
          </p>
      </div>)
}

const ViewPetSimple = ({petUrl}) => {
    const [name, setName] = useState("")
    const [level, setLevel] = useState(0)
    const [health, setHealth] = useState(100)
    const [overallFoodIntake, setOverallFoodIntake] = useState(0)
    const [foodNextLevel, setFoodNextLevel] = useState(1)
    const [pet, setPet] = useState({})
    const [reqData, setReqData] = useState("")
    try {
        //  get pet info from backend API
        async function getPet(url) {
            const pet = await getObject(url)
            // update pet object
            setPet(pet)
            setName(pet.name)
            setLevel(pet.level)
            setHealth(pet.health)
            setOverallFoodIntake(pet.overallFoodIntake)
            setFoodNextLevel(pet.overallFoodIntake + pet.foodRequiredToLevelUp)
        }
        useEffect(() => {
            setPet({})
            getPet(petUrl);
        }, [reqData])
    } catch (error) {
        console.log(error)
    }
    return (
      <div style={petStyle}>
          <p>{name}</p>
          <p>Level: {level}  {overallFoodIntake}/{foodNextLevel} </p>
          <p>Health: {health} </p>
      </div>)
}

export {ViewPetSimple, ViewPet, PetNameInput};