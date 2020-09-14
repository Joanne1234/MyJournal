import React, {useState} from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { makeNewPost, patch } from '../fetch/generalFetch';

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

async function submitMood(postUrl, id, scale, description){
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

function MoodInput({moodUrl}) {
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
  }

export default MoodInput;