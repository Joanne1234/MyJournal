import React, {useState, useEffect} from 'react';
import { 
    makeNewPost, 
    patch, 
    getObject,
    deleteObject
} from '../fetch/generalFetch';
import { MoodInput } from './Mood';

const reflectionStyle = {
    alignContent: 'center',
    margin: 5,
    padding: 5,
    outline: "thick solid lavender"
}

async function submitReflection(postUrl, id, title, entry, positives, scale, comments) {
    console.log("patchjournal...", title, entry, positives, scale)
    const newEntryDetails = {
        title: title,
        entry: entry,
        positives: positives,
        mood: scale,
        comments: comments
    }
    var newPost = null
    if (id != null) {
        postUrl+= "/" + id
        newPost = await patch(postUrl, newEntryDetails)
    } else {
        newPost = await makeNewPost(postUrl, newEntryDetails)
    }
    if (newPost) {
        console.log(newPost)
        id = newPost._id
        return id
    }
}
async function deleteReflection(url, id, setChange) {
    console.log("deletereflection...", url, id)
    if (id != null) {
        url+= "/" + id
        const result = await deleteObject(url)
        if (Array.isArray(result)) {
            setChange(id)
            return result
        }
    } 
    return []
}
const ReflectionInput = React.memo(({journalUrl, journal}) => {
    const [title, setTitle] = useState("")
    const [entry, setEntry] = useState("")
    const [positives, setPositives] = useState("")
    const [mood, setMood] = useState(0)
    const [com, setCom] = useState("")
    const [id, setID] = useState(null)
    if (journal) {
        setTitle(journal.title)
        setEntry(journal.entry)
        setMood(journal.mood.scale)
        setCom(journal.mood.comments)
        setPositives(journal.positives)
    }
    return (
      <div style={reflectionStyle}>
        <form>
          <p>Entry Title: 
          <input 
            type="text"
            value={title}
            onChange={(e) => {
                setTitle(e.target.value)
            }}
          />
          </p>
          <p>Your Entry: </p>
          <input 
            type="text"
            value={entry}
            onChange={(e) => {
                setEntry(e.target.value)
            }}
          />
          <p>What were the positives? </p>
          <input 
            type="text"
            value={positives}
            onChange={(e) => {
                setPositives(e.target.value)
            }}
          />
          <MoodInput 
          text1="How did you feel" 
          scale={mood}
          setScale={setMood}
          setCom={setCom}
          com={com}
          />
          <p/>
          <button 
            title = "Save"
            onClick={async (e) => {
                e.preventDefault()
                const newID = await submitReflection(journalUrl, id, title, entry, positives, mood, com)
                setID(newID)
                console.log("newID", newID)
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
    );
})

const ViewReflection = ({reflectionUrl, reflection, setChange}) => {
    if (!reflection) {
        return
    }
    const date = reflection.dateCreated
    const title = reflection.title
    const mood = reflection.mood.scale
    const entry = reflection.entry
    const positives = reflection.positives
    const id = reflection._id
    return (
      <div style={reflectionStyle}>
          <p>{date.toString()}</p>
          <p>{title}</p>
          <p>Mood: {mood}/10 </p>
          <p>Entry: {entry}</p>
          <p>Positives: {positives}</p>
          <button 
            title = "Edit"
            onClick={async (e) => {
                e.preventDefault()
            }}
          > 
            Edit 
          </button>
          <button 
            title = "Delete"
            onClick={async (e) => {
                e.preventDefault()
                deleteReflection(reflectionUrl, id, setChange)
            }}
          > 
            Delete 
          </button>
      </div>)
}

const ViewReflectionSimple = ({reflectionUrl, reflection, setChange}) => {
    if (!reflection) {
        return
    }
    const date = reflection.dateCreated
    const title = reflection.title
    const mood = reflection.mood.scale
    const id = reflection._id
    return (
      <div 
        style={reflectionStyle}
      >
          <p>{date.toString()}</p>
          <p>{title}</p>
          <p>Mood: {mood}/10 </p>
          <button 
            title = "Edit"
            onClick={async (e) => {
                e.preventDefault()
            }}
          > 
            Edit 
          </button>
          <button 
            title = "Delete"
            onClick={async (e) => {
                e.preventDefault()
                deleteReflection(reflectionUrl, id, setChange)
            }}
          > 
            Delete 
          </button>
      </div>)
}

const ViewReflections = ({reflectionUrl}) => {
    const [reflections, setReflections] = useState([])
    const [reqData, setReqData] = useState("")
    try {
        //  get Reflections from backend API
        async function getReflections(url) {
            const reflections = await getObject(url)
            // update reflection array
            setReflections(reflections)
        }
        useEffect(() => {
            console.log("getJournal...")
            setReflections([])
            getReflections(reflectionUrl);
            console.log("new journals", reflections)
        }, [reqData])
    } catch (error) {
        console.log(error)
    }
    return (<div>
        Your Reflections:
        {reflections.map((reflection) => 
          (<ViewReflectionSimple
            reflection={reflection} 
            reflectionUrl={reflectionUrl} 
            setReflections={setReflections}
            setChange={setReqData}
            key={reflection._id}
          />))}
    </div>)
}

export {ReflectionInput, ViewReflections, ViewReflection};