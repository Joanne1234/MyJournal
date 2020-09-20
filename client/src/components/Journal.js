import React, {useState, useEffect} from 'react';
import { 
    makeNewPost, 
    patch, 
    getObject,
    deleteObject
} from '../fetch/generalFetch';
import { MoodInput } from './Mood';
import ErrorMessage from './Error'
import history from './history'

import {Link, Switch, Route, useLocation, useParams} from 'react-router-dom'

const journalStyle = {
    alignContent: 'center',
    margin: 5,
    padding: 5,
    outline: "thick solid white",
    backgroundColor: "palegreen",
    overflow: 'scroll',
}

const textBoxStyle = {
    width: '95%',
    height: '40',
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
    if (newPost.msg) {
        return newPost
    }
    id = newPost._id
    return id
}
async function deleteJournal(url, id, setChange) {
    console.log("deletejournal...", url, id, setChange)
    if (id != null) {
        url+= "/" + id
        const result = await deleteObject(url)
        if (Array.isArray(result)) {
            if (setChange) {
                setChange(id)
            }
            return result
        }
    } 
    return []
}
const JournalInput = React.memo(({journalUrl, journal, setUserChange}) => {
    console.log("Journal input////")
    const [title, setTitle] = useState("")
    const [entry, setEntry] = useState("")
    const [positives, setPositives] = useState("")
    const [mood, setMood] = useState(0)
    const [com, setCom] = useState("")
    const [id, setID] = useState(null)
    const [displayError, setDisplayError] = useState("none")
    const [error, setError] = useState("")
    const params = useParams()
    const journalId = params.journalId
    if (journal) {
        setTitle(journal.title)
        setEntry(journal.entry)
        setMood(journal.mood.scale)
        setCom(journal.mood.comments)
        setPositives(journal.positives)
    }
    try {
        async function getJournal() {
            if (!journalId) {
                return
            }
            console.log(journalId)
            const journal = await getObject(journalUrl+"/"+journalId)
            if (journal && journal.msg) {
                return
            }
            console.log("journal...")
            setTitle(journal.title)
            setMood(journal.mood.scale)
            setCom(journal.mood.comments)
            setEntry(journal.entry)
            setPositives(journal.positives)
        }
        useEffect(()=> {
            getJournal()
        }, [])
    } catch (err) {
        console.log(err)
        return null
    }
    return (
      <div style={journalStyle}>
        <form>
          <p>Entry Title: 
          <input 
            type="text"
            style={textBoxStyle}
            value={title}
            onChange={(e) => {
                setTitle(e.target.value)
            }}
          />
          </p>
          <p>Your Entry: </p>
          <textarea 
            style={textBoxStyle}
            value={entry}
            onChange={(e) => {
                setEntry(e.target.value)
            }}
          />
          <p>What were the positives? </p>
          <textarea 
            style={textBoxStyle}
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
          <ErrorMessage 
            display={displayError} 
            msg={error}
          />
          <button 
            title = "Save"
            onClick={async (e) => {
                e.preventDefault()
                const newID = await submitJournal(journalUrl, id, title, entry, positives, mood, com)
                if (newID && newID.msg) {
                    // show error message
                    setDisplayError("block")
                    setError(newID.msg)
                    return
                }
                // ensure no error msg
                setDisplayError("none")
                setError("")
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
    );
})

const ViewJournal = ({journalUrl, journal, setChange, setUserChange}) => {
    const params = useParams()
    const pathname = useLocation().pathname
    const journalId = params.journalId
    const [date, setDate] = useState(Date.now())
    const [title, setTitle] = useState("")
    const [entry, setEntry] = useState("")
    const [mood, setMood] = useState(0)
    const [comm, setComm] = useState("")
    const [positives, setPositives] = useState("")
    if (journal) {
      setDate(journal.dateCreated)
      setTitle(journal.title)
      setMood(journal.mood.scale)
      setComm(journal.mood.comments)
      setEntry(journal.entry)
      setPositives(journal.positives)
    }
    try {
        async function getJournal() {
            const journal = await getObject(journalUrl+"/"+journalId)
            if (journal && journal.msg) {
                return null
            }
            setDate(journal.dateCreated)
            setTitle(journal.title)
            setMood(journal.mood.scale)
            setComm(journal.mood.comments)
            setEntry(journal.entry)
            setPositives(journal.positives)
        }
        useEffect(()=> {
            getJournal()
        })
    } catch (err) {
        console.log(err)
        return null
    }
    return (
      <div style={journalStyle}>
          <p>{date.toString()}</p>
          <p>{title}</p>
          <p>Mood: {mood}/10 </p>
          <p>Comments: {comm}</p>
          <p>Entry: {entry}</p>
          <p>Positives: {positives}</p>
          <Link to={{pathname: pathname+'/edit/'+journalId}}>
            <button 
              title = "Edit"
            > 
              Edit 
            </button>
          </Link>{' '}
          <button 
            title = "Delete"
            onClick={async (e) => {
                e.preventDefault()
                deleteJournal(journalUrl, journalId, setChange)
                history.push('/home/journals')
            }}
          > 
            Delete 
          </button>
          <Switch>
            <Route path={pathname+"/edit/:journalId"} component={() => <JournalInput journalUrl={journalUrl} journal={journal} setChange={setChange} setUserChange={setUserChange}/>}/>
          </Switch>
      </div>)
}

const ViewJournalSimple = ({journalUrl, journal, setChange, setUserChange}) => {
    const pathname = useLocation().pathname
    console.log("pathname:", pathname)
    const date = journal.dateCreated
    const title = journal.title
    const mood = journal.mood.scale
    const id = journal._id
    if (!journal) {
        history.push('/home')
        return
    }
    return (
      <div 
        style={journalStyle}
      >
          <p>{date.toString()}</p>
          <p>{title}</p>
          <p>Mood: {mood}/10 </p>
          <Link to={{pathname: pathname+'/'+id}}>
            <button 
              title = "View"
            > 
              View
            </button>
          </Link>{' '}
          <Link to={{pathname: pathname+'/edit/'+id}}>
            <button 
              title = "Edit"
            > 
              Edit 
            </button>
          </Link>{' '}
          <button 
            title = "Delete"
            onClick={async (e) => {
                e.preventDefault()
                deleteJournal(journalUrl, id, setChange)
            }}
          > 
            Delete 
          </button>
          <Switch>
            <Route path={pathname+"/:journalId"} component={() => <ViewJournal journalUrl={journalUrl} journal={journal} setChange={setChange} setUserChange={setUserChange}/>}/>
            <Route path={pathname+"/edit/:journalId"} component={() => <JournalInput journalUrl={journalUrl} journal={journal} setUserChange={setUserChange}/>}/>
          </Switch>
      </div>)
}

const ViewJournals = ({journalUrl, setUserChange}) => {
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
            setJournals([])
            getJournals(journalUrl);
        }, [reqData])
    } catch (error) {
        console.log(error)
    }
    return (<div style={journalStyle}>
        Your Journals:
        {journals.map((journal) => 
          (<ViewJournalSimple
            journal={journal} 
            journalUrl={journalUrl} 
            setJournals={setJournals}
            setChange={setReqData}
            key={journal._id}
            setUserChange={setUserChange}
          />))}
    </div>)
}

export {JournalInput, ViewJournals, ViewJournal};