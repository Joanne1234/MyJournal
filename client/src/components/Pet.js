import React, {useState, useEffect} from 'react';
import { 
    makeNewPost, 
    patch, 
    getObject
} from '../fetch/generalFetch';
import Image from './Image'
import egg from '../assets/egg.png'
import baby from '../assets/baby.png'
import toddler from '../assets/toddler.png'
import teen from '../assets/teen.png'
import adult from '../assets/adult.png'

const petStates = [egg, baby, toddler, teen, adult]

const petStyle = {
    alignContent: 'center',
    margin: 5,
    padding: 5,
    alignSelf: 'center',
    textAlign: 'center'
}

const infoStyle = {
    backgroundColor: "lightcoral",
    padding: 3,
}

const imageStyle = {
    padding: 5,
    margin: 5,
    alignContent: 'center',
    display: 'block',
    visibility: 'visible',
}

const imageWidth = "auto"
const imageHeight = Math.floor(window.innerHeight / 2)

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

const ViewPet = ({petUrl, setUserChange}) => {
    const [status, setStatus] = useState(0)
    const [name, setName] = useState("Rocky")
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
            if (!pet) {
                return
            }
            setPet(pet)
            const date = pet.born
            setName(pet.name)
            setNewName(pet.name)
            setLevel(pet.level)
            setHealth(pet.health)
            setStatus(Math.round(pet.level/5))
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
          <Image 
            src={petStates[status]} 
            alt={name}
            width={imageWidth}
            height={imageHeight}
            style={imageStyle}
          />
          <div style={infoStyle}>
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
                setUserChange(Math.random.toString(36))
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
                setUserChange(Math.random.toString(36))
              }}
            > 
              Feed
            </button>
          </p>
          </div>
      </div>)
}

const ViewPetSimple = ({petUrl}) => {
    const [status, setStatus] = useState(0)
    const [name, setName] = useState("")
    const [level, setLevel] = useState(0)
    const [health, setHealth] = useState(100)
    const [overallFoodIntake, setOverallFoodIntake] = useState(0)
    const [foodNextLevel, setFoodNextLevel] = useState(1)
    const [pet, setPet] = useState({})
    try {
        useEffect(() => {
           //  get pet info from backend API
          async function getPet(url) {
            const pet = await getObject(url)
            if (!pet) {
                return
            }
            // update pet object
            setPet(pet)
            setName(pet.name)
            setLevel(pet.level)
            setStatus(Math.round(pet.level/5))
            setHealth(pet.health)
            setOverallFoodIntake(pet.overallFoodIntake)
            setFoodNextLevel(pet.overallFoodIntake + pet.foodRequiredToLevelUp)
          }  
          setPet({})
          getPet(petUrl);
        }, [])
    } catch (error) {
        console.log(error)
    }
    return (
      <div style={petStyle}>
          <Image 
            src={petStates[status]} 
            alt={name}
            width={imageWidth}
            height={imageHeight}
            style={imageStyle}
          />
          <div style={infoStyle}>
            <p>{name}</p>
            <p>Level: {level}  {overallFoodIntake}/{foodNextLevel} </p>
            <p>Health: {health} </p>
          </div>
      </div>)
}

export {ViewPetSimple, ViewPet, PetNameInput};