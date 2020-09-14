import React, {useState, useEffect} from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { 
    makeNewPost, 
    patch, 
    getObject
} from '../fetch/generalFetch';

const moodStyle = {
    alignContent: 'center',
    margin: 5,
    padding: 5,
    outline: "thick solid lightblue"
}

const moodSlider = {
    position: 'inherit',
    margin: 5,
    padding: 5
}

async function submitMood(postUrl, id, scale, description) {
    console.log("patchmood...", scale, description, id)
    const newMood = {
        mood: scale,
        description: description
    }
    var newPost = null
    if (id != null) {
        postUrl+= "/" + id
        newPost = await patch(postUrl, newMood)
    } else {
        newPost = await makeNewPost(postUrl, newMood)
    }
    if (newPost) {
        console.log(newPost)
        id = newPost._id
        return id
    }
}

const MoodInput = React.memo(({moodUrl}) => {
    const [scale, setScale] = useState(0)
    const [des, setDes] = useState("")
    const [id, setID] = useState(null)
    return (
      <div style={moodStyle}>
        <form>
          <p>How are you feeling today? </p>
          <div style={moodSlider}>
            <Slider
              min={-1}
              max={10}
              onChange={(value) => {
                setScale(value)
            }}
            />
            <p>{scale}</p>
          </div>
          <p>How would you describe your day?</p>
          <input 
            type="text"
            onChange={(e) => {
                setDes(e.target.value)
            }}
          />
          <button 
            title = "Done"
            onClick={async (e) => {
                e.preventDefault()
                const newID = await submitMood(moodUrl, id, scale, des)
                setID(newID)
                console.log("newID", newID)
            }}
          > 
            Save 
          </button>

        </form>
      </div>
    );
})

const ViewMood = ({mood}) => {
    if (!mood) {
        return
    }
    const date = mood.dateCreated
    const scale = mood.scale
    const des = mood.description
    const id = mood._id
    /*
    const parent = mood.parent.id
    var journal = false
    var reflection = false
    if (parent) {
        if (mood.parent.reflection == true) {
          reflection = true
        }
        if (mood.parent.journal == true) {
          journal = true
        }
    }*/
    return (
      <div style={moodStyle}>
          <p>{date.toString()}</p>
          <p>Rating: {scale}/10 </p>
          <p>{des}</p>
      </div>)
}

const ViewMoods = ({moodUrl}) => {
    const [moods, setMoods] = useState([])
    try {
        //  get Moods from backend API
        async function getMoods(url) {
            const moods = await getObject(url)
            // update moods array
            setMoods(moods)
        }
        useEffect(() => {
          getMoods(moodUrl);
        }, [])
    } catch (error) {
        console.log(error)
    }
    return (<div>
        Your Moods:
        {moods.map((mood) => (<ViewMood mood={mood} key={mood._id}/>))}
    </div>)
}

export {MoodInput, ViewMoods, ViewMood};