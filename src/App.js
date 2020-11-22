import React,{useState,useEffect} from 'react';
import {Jumbotron,} from 'reactstrap'
import './App.css';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'

function App() {
  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState(null)
  const [savedNotes, setSavedNotes] = useState([])

  const  handleListen=()=>{
    if(isListening){
      mic.start()
      mic.onend=()=>{
        console.log("continue...")
      }
    }else{
      mic.stop()
      mic.onend=()=>{
        console.log("stopped mic on click")
      }
    }
    mic.onstart=()=>{
      console.log("Mics On")
    }
    mic.onresult=(event)=>{
      const transcript = Array.from(event.results).map(result => result[0])
        .map(result => result.transcript)
        .join('')
        console.log(transcript)
        setNote(transcript)
        mic.onerror=(event)=>{
          console.log(event.error)
        }
    }
  }

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note])
    setNote('')
  }
  
  useEffect(() => {
    handleListen()
  }, [isListening])

  
  return (
    <div className="container">
      <Jumbotron>
      <h1><i class="fa fa-microphone"></i> Voice Notes</h1>
      </Jumbotron>
      <div class="card">
        <div class="card-body">
           <h2>Current Note</h2>
          {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
          <button type='button' class="btn btn-primary" onClick={handleSaveNote} disabled={!note}>Save Note</button>  &nbsp;
          <button type='button' class="btn btn-success" onClick={()=>setIsListening(prevstate=>!prevstate)}>Start/Stop</button>
          <p>{note}</p>
          </div>
      </div> <br/><br/><br/>  
        <div class='card'>
          <div class="card_body">
              <h2>Notes</h2>
          {savedNotes.map(n => (
            <p key={n}>{n}</p>
          ))}<br/>
          </div>
        </div><br/><br/><br/><br/><br/><br/><br/>
    </div>
  );
}

export default App;
