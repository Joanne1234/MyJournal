import React, {useState, useEffect} from 'react';
import { 
    makeNewPost, 
    patch, 
    getObject,
    deleteObject
} from '../fetch/generalFetch';
import { MoodInput } from './Mood';

const journalStyle = {
    alignContent: 'center',
    margin: 5,
    padding: 5,
    outline: "thick solid palegreen"
}

async function submitJournal(postUrl, id, title, entry, positives, scale, comments) {
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
async function deleteJournal(url, id, setChange) {
    console.log("deletejournal...", url, id)
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
const JournalInput = React.memo(({journalUrl, journal}) => {
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
      <div style={journalStyle}>
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
                const newID = await submitJournal(journalUrl, id, title, entry, positives, mood, com)
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

const ViewJournal = ({journalUrl, journal, setChange}) => {
    if (!journal) {
        return
    }
    const date = journal.dateCreated
    const title = journal.title
    const mood = journal.mood.scale
    const entry = journal.entry
    const positives = journal.positives
    const id = journal._id
    return (
      <div style={journalStyle}>
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
                deleteJournal(journalUrl, id, setChange)
            }}
          > 
            Delete 
          </button>
      </div>)
}

const ViewJournalSimple = ({journalUrl, journal, setChange}) => {
    if (!journal) {
        return
    }
    const date = journal.dateCreated
    const title = journal.title
    const mood = journal.mood.scale
    const id = journal._id
    return (
      <div 
        style={journalStyle}
      >
          <p>{date.toString()}</p>
          <p>{title}</p>
          <p>Mood: {mood}/10 </p>
          <button 
            title = "View"
            onClick={async (e) => {
                e.preventDefault()
            }}
          > 
            View Reflection
          </button>
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
                deleteJournal(journalUrl, id, setChange)
            }}
          > 
            Delete 
          </button>
      </div>)
}

const ViewJournals = ({journalUrl}) => {
    const [journals, setJournals] = useState([])
    const [reqData, setReqData] = useState("")
    try {
        //  get Journals from backend API
        async function getJournals(url) {
            const journals = await getObject(url)
            // update journals array
            setJournals(journals)
        }
        useEffect(() => {
            console.log("getJournal...")
            setJournals([])
            getJournals(journalUrl);
            console.log("new journals", journals)
        }, [reqData])
    } catch (error) {
        console.log(error)
    }
    return (<div>
        Your Journals:
        {journals.map((journal) => 
          (<ViewJournalSimple
            journal={journal} 
            journalUrl={journalUrl} 
            setJournals={setJournals}
            setChange={setReqData}
            key={journal._id}
          />))}
    </div>)
}

export {JournalInput, ViewJournals, ViewJournal};