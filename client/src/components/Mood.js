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
    margin: 10,
    padding: 5,
    outline: "thick solid white",
    backgroundColor: "paleturquoise",
    overflow: 'scroll',
}

const moodSlider = {
    position: 'inherit',
}

async function submitMood(postUrl, id, scale, comments) {
    console.log("patchmood...", scale, comments, id)
    const newMood = {
        mood: scale,
        comments: comments
    }
    var newPost = null
    if (id != null) {
        postUrl+= "/" + id
        newPost = await patch(postUrl, newMood)
    } else {
      console.log("new post...", postUrl, newMood)  
      newPost = await makeNewPost(postUrl, newMood)
    }
    if (newPost) {
        console.log(newPost)
        id = newPost._id
        return id
    }
}

// wrapper around mood input section
const MoodForm = React.memo(({moodUrl, setUserChange}) => {
  const [scale, setScale] = useState(0)
  const [com, setCom] = useState("")
  const [id, setID] = useState(null)
  return (
    <div style={moodStyle}>
      <form>
        <MoodInput 
          text1="How are you feeling today?" 
          scale={scale}
          setScale={setScale}
          setCom={setCom}
          com={com}
        />
        <p/>
        <button 
          title = "Done"
          onClick={async (e) => {
              e.preventDefault()
              const newID = await submitMood(moodUrl, id, scale, com)
              setID(newID)
              const random = Math.random().toString(36).substring(2, 15)
              setUserChange(random)
          }}
        > 
          Save 
        </button>
        <button 
            title = "Back"
            onClick={async (e) => {
                e.preventDefault()
            }}
          > 
            Back 
        </button>
      </form>
    </div>
  )
})

const MoodInput = React.memo(({text1, scale, setScale, setCom, com}) => {
    /*const [scale, setScale] = useState(0)
    const [com, setCom] = useState("")
    const [id, setID] = useState(null)*/
    return (
      <div style={moodStyle}>
        <p>{text1}</p>
        <div style={moodSlider}>
          <Slider
            min={-1}
            max={10}
            value={scale}
            onChange={(value) => {
            setScale(value)
            }}
          />
          <p>{scale}</p>
        </div>
        <p>Comments:
        <input 
          type="text"
          value={com}
          onChange={(e) => {
            setCom(e.target.value)
          }}
        />
        </p>
      </div>
    );
})

const ViewMood = ({mood}) => {
    if (!mood) {
        return
    }
    const date = mood.dateCreated
    const scale = mood.scale
    const des = mood.comments
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
          <p>Mood: {scale}/10 </p>
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
    return (<div style={moodStyle}>
        Your Moods:
        {moods.map((mood) => (<ViewMood mood={mood} key={mood._id}/>))}
    </div>)
}

export {MoodInput, ViewMoods, ViewMood, MoodForm};