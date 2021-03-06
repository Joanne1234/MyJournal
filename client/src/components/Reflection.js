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
import {Link, Route, useLocation, useParams} from 'react-router-dom'

const reflectionStyle = {
    alignContent: 'center',
    margin: 5,
    padding: 5,
    outline: "thick solid white",
    overflow: 'scroll',
    backgroundColor: "lavender"
}

const textBoxStyle = {
    width: '95%',
    height: '40',
}

async function submitReflection(postUrl, id, 
    event, des, learnt, 
    scaleB, scaleD, scaleA, 
    comB, comD, comA, 
    eva, ana, act, con) {
    
    var extended = false;
    if (eva !== "" || ana !== "" || act !== "" || con !== "") {
        extended = true
    }

    const newEntryDetails = {
        event: event,
        description: des,
        learnt: learnt,
        moodBefore: scaleB,
        moodDuring: scaleD,
        moodAfter: scaleA,
        commentsBefore: comB,
        commentsDuring: comD,
        commentsAfter: comA,
        evaluation: eva,
        actions: ana,
        actionPlan: act,
        conclusion: con,
        extended: extended
    }
    var newPost = null
    if (id != null) {
        postUrl+= "/" + id
        newPost = await patch(postUrl, newEntryDetails)
    } else {
        newPost = await makeNewPost(postUrl, newEntryDetails)
    }
    // error
    if (newPost && newPost.msg) {
        return newPost
    }
    id = newPost._id
    return id
}
async function deleteReflection(url, id, setChange) {
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

const ReflectionInput = React.memo(({reflectionUrl, reflection, setUserChange}) => {
    // set variables (reflection input)
    const [event, setEvent] = useState("")
    const [des, setDes] = useState("")
    const [learnt, setLearnt] = useState("")
    const [moodB, setMoodB] = useState(0)
    const [moodD, setMoodD] = useState(0)
    const [moodA, setMoodA] = useState(0)
    const [comB, setComB] = useState("")
    const [comD, setComD] = useState("")
    const [comA, setComA] = useState("")
    const [ana, setAna] = useState("")
    const [con, setCon] = useState("")
    const [eva, setEva] = useState("")
    const [act, setAct] = useState("")
    const [id, setID] = useState(null)
    // set variables for error msgs
    const [displayError, setDisplayError] = useState("none")
    const [error, setError] = useState("")

    const params = useParams()
    const reflectionId = params.reflectionId
    if (reflection) {
        setEvent(reflection.event)
        setDes(reflection.description)
        setLearnt(reflection.learnt)
        setMoodB(reflection.feelings.moodBefore.scale)
        setMoodD(reflection.feelings.moodDuring.scale)
        setMoodA(reflection.feelings.moodAfter.scale)
        setComB(reflection.feelings.moodBefore.comments)
        setComD(reflection.feelings.moodDuring.comments)
        setComA(reflection.feelings.moodAfter.comments)
        setEva(reflection.evaluation)
        setCon(reflection.conclusion)
        setAna(reflection.analysis)
        setAct(reflection.actionPlan)
        setID(reflectionId)
    }
    try {
      async function getReflection() {
          if (!reflectionId) {
              return
          }
          const reflection = await getObject(reflectionUrl+"/"+reflectionId)
          if (reflection && reflection.msg) {
              return
          }
          setEvent(reflection.event)
          setDes(reflection.description)
          setLearnt(reflection.learnt)
          setMoodB(reflection.feelings.moodBefore.scale)
          setMoodD(reflection.feelings.moodDuring.scale)
          setMoodA(reflection.feelings.moodAfter.scale)
          setComB(reflection.feelings.moodBefore.comments)
          setComD(reflection.feelings.moodDuring.comments)
          setComA(reflection.feelings.moodAfter.comments)
          setEva(reflection.evaluation)
          setCon(reflection.conclusion)
          setAna(reflection.analysis)
          setAct(reflection.actionPlan)
          setID(reflectionId)
      }
        useEffect(()=> {
          getReflection()
      }, [])
    } catch (err) {
        console.log(err)
        return null
    }
    return (
      <div style={reflectionStyle}>
        <p>Write a reflection!!!</p>
        <form>
          <p>Event title: 
          <input 
            style={textBoxStyle}
            placeholder="event"
            type="text"
            value={event}
            onChange={(e) => {
                setEvent(e.target.value)
            }}
          />
          </p>
          <p>What happened? </p>
          <textarea 
            style={textBoxStyle}
            value={des}
            placeholder="description"
            onChange={(e) => {
                setDes(e.target.value)
            }}
          />
          <p>Action - What did you do in response: </p>
          <textarea 
            style={textBoxStyle}
            placeholder="actions"
            value={ana}
            onChange={(e) => {
                setAna(e.target.value)
            }}
          />
          <p>Lessons Learnt: </p>
          <textarea 
            style={textBoxStyle}
            placeholder="what you learnt from this"
            value={learnt}
            onChange={(e) => {
                setLearnt(e.target.value)
            }}
          />
          <MoodInput 
          text1="How did you feel before the event?" 
          scale={moodB}
          setScale={setMoodB}
          setCom={setComB}
          com={comB}
          />
          <MoodInput 
          text1="How did you feel during the event?" 
          scale={moodD}
          setScale={setMoodD}
          setCom={setComD}
          com={comD}
          />
          <MoodInput 
          text1="How did you feel after the event?" 
          scale={moodA}
          setScale={setMoodA}
          setCom={setComA}
          com={comA}
          />
          <p>Did you think you did a good job? </p>
          <textarea 
            style={textBoxStyle}
            placeholder="evaluation"
            value={eva}
            onChange={(e) => {
                setEva(e.target.value)
            }}
          />
          <p>What would you do if it happened again? </p>
          <textarea 
            style={textBoxStyle}
            placeholder="action plan"
            value={act}
            onChange={(e) => {
                setAct(e.target.value)
            }}
          />
          <p>Overall how did you think you went: </p>
          <textarea
            style={textBoxStyle} 
            placeholder="conclusion"
            type="text"
            value={con}
            onChange={(e) => {
                setCon(e.target.value)
            }}
          />
          <ErrorMessage 
            display={displayError} 
            msg={error}
          />
          <button 
            title = "Save"
            onClick={async (e) => {
                e.preventDefault()
                const newID = await submitReflection(reflectionUrl, id, 
                    event, des, learnt, 
                    moodB, moodD, moodA, 
                    comB, comD, comA,
                    eva, ana, act, con
                    )
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
                history.push('/home/reflections')
            }}
          > 
            Save 
          </button>
          <button 
            title = "Back"
            onClick={async (e) => {
                e.preventDefault()
                history.goBack()
            }}
          > 
            Back 
          </button>
        </form>
      </div>
    );
})

const ViewReflection = ({reflectionUrl, reflection, setChange, setUserChange}) => {
    const path = useLocation().pathname
    const pathname = path.replace(/\/$/, '')
    const [event, setEvent] = useState("")
    const [des, setDes] = useState("")
    const [learnt, setLearnt] = useState("")
    const [moodB, setMoodB] = useState(0)
    const [moodD, setMoodD] = useState(0)
    const [moodA, setMoodA] = useState(0)
    const [comB, setComB] = useState("")
    const [comD, setComD] = useState("")
    const [comA, setComA] = useState("")
    const [ana, setAna] = useState("")
    const [con, setCon] = useState("")
    const [eva, setEva] = useState("")
    const [act, setAct] = useState("")
    const [id, setID] = useState(null)
    const [date, setDate] = useState(Date.now())
    const params = useParams()
    const reflectionId = params.reflectionId
    if (reflection) {
        setEvent(reflection.event)
        setDes(reflection.description)
        setLearnt(reflection.learnt)
        setMoodB(reflection.feelings.moodBefore.scale)
        setMoodD(reflection.feelings.moodDuring.scale)
        setMoodA(reflection.feelings.moodAfter.scale)
        setComB(reflection.feelings.moodBefore.comments)
        setComD(reflection.feelings.moodDuring.comments)
        setComA(reflection.feelings.moodAfter.comments)
        setEva(reflection.evaluation)
        setCon(reflection.conclusion)
        setAna(reflection.analysis)
        setAct(reflection.actionPlan)
        setID(reflectionId)
        setDate(reflection.dateCreated)
    }
    try {
        async function getReflection() {
          if (!reflectionId) {
              return
          }
          const reflection = await getObject(reflectionUrl+"/"+reflectionId)
          if (reflection && reflection.msg) {
              return
          }
          setEvent(reflection.event)
          setDes(reflection.description)
          setLearnt(reflection.learnt)
          setMoodB(reflection.feelings.moodBefore.scale)
          setMoodD(reflection.feelings.moodDuring.scale)
          setMoodA(reflection.feelings.moodAfter.scale)
          setComB(reflection.feelings.moodBefore.comments)
          setComD(reflection.feelings.moodDuring.comments)
          setComA(reflection.feelings.moodAfter.comments)
          setEva(reflection.evaluation)
          setCon(reflection.conclusion)
          setAna(reflection.analysis)
          setAct(reflection.actionPlan)
          setDate(reflection.dateCreated)
          setID(reflectionId)
        }
        useEffect(()=> {
            getReflection()
        }, [])
    } catch (err) {
        console.log(err)
        return null
    }
    return (
      <div style={reflectionStyle}>
          <p>{date.toString()}</p>
          <p>{event}</p>
          <p>{des}</p>
          <p>Actions taken: {ana}</p>
          <p>Lessons Learnt: {learnt}</p>
          <p>Mood Before: {moodB}/10</p>
          <p>{comB}</p>
          <p>Mood During: {moodD}/10</p>
          <p>{comD}</p>
          <p>Mood After: {moodA}/10</p>
          <p>{comA}</p>
          <p>Evaluation: {eva}</p>
          <p>Action Plan for next time: {act}</p>
          <p>Conclusion: {con}</p>
          <Link to={{pathname: pathname+'/edit'}}>
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
                deleteReflection(reflectionUrl, id, setUserChange)
                history.push('/home/reflections')
            }}
          > 
            Delete 
          </button>
          <Route path={pathname+"/edit"} component={() => <ReflectionInput reflectionUrl={reflectionUrl} reflection={reflection} setChange={setChange} setUserChange={setUserChange}/>}/>
      </div>)
}

const ViewReflectionSimple = ({reflectionUrl, reflection, setChange, setUserChange}) => {
    const path = useLocation().pathname
    const pathname = path.replace(/\/$/, '')
    const date = reflection.dateCreated
    const event = reflection.event
    const id = reflection._id
    if (!reflection) {
      history.push('/home')
      return null
    }
    return (
      <div 
        style={reflectionStyle}
      >
          <p>{date.toString()}</p>
          <p>{event}</p>
          <Link to={{pathname: pathname+'/'+id}}>
            <button 
              title = "View"
            > 
              View
            </button>
          </Link>{' '}
          <Link to={{pathname: pathname+'/'+id+'/edit'}}>
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
                deleteReflection(reflectionUrl, id, setChange)
            }}
          > 
            Delete 
          </button>
          <Route exact path={pathname+"/:reflectionId"} component={() => <ViewReflection reflectionUrl={reflectionUrl} reflection={reflection} setChange={setChange} setUserChange={setUserChange}/>}/>
          <Route path={pathname+"/:reflectionId/edit"} component={() => <ReflectionInput reflectionUrl={reflectionUrl} reflection={reflection} setChange={setChange} setUserChange={setUserChange}/>}/>
      </div>)
}

const ViewReflections = ({reflectionUrl, setUserChange}) => {
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
            setReflections([])
            getReflections(reflectionUrl);
        }, [reqData])
    } catch (error) {
        console.log(error)
    }
    return (<div style={reflectionStyle}>
        Your Reflections:
        {reflections.map((reflection) => 
          (<ViewReflectionSimple
            reflection={reflection} 
            reflectionUrl={reflectionUrl} 
            setReflections={setReflections}
            setChange={setReqData}
            key={reflection._id}
            setUserChange={setUserChange}
          />))}
    </div>)
}

export {ReflectionInput, ViewReflections, ViewReflection};