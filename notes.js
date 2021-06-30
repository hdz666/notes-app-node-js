const { notStrictEqual } = require('assert')
const fs = require('fs')
const chalk = require('chalk')
const { showCompletionScript } = require('yargs')

const errMsg = chalk.red.bold
const sucMsg = chalk.green.bold
const statMsg = chalk.blue.underline






const addNote = (title,body)=>{
const notes = loadNotes()
const duplicateNotes = notes.filter((note)=>note.title === title)
const duplicateNote = notes.find((note)=> note.title===title)

if(!duplicateNote){

    notes.push({
        title: title,
        body: body
    })
    
    saveNotes(notes)
    console.log(sucMsg('New Notes added!'))

}
else{
    console.log(statMsg('Note Title taken !'))
}

}


const readNotes =(title)=>{

    const notes = loadNotes()
    console.log(chalk.yellow.inverse('Reading notes....'))
    const readNote = notes.find((note)=>note.title===title)
    if(readNote){
        console.log(statMsg.inverse('Note with '+title+' found'))
        console.log(chalk.inverse.red(readNote.title))
        console.log(chalk.red.inverse(readNote.body))
        
    }
    else{
        console.log(statMsg.inverse('No Note with '+title+' found'))
    }
}
    

    
const listNotes = () => {
    const notes = loadNotes()    
    console.log(chalk.yellow.bold('Your notes....'))
    notes.forEach((note)=>{
        console.log(note.title)
    })
   
}

const removeNote=(title)=>{
    
    const notes = loadNotes()
    const prev = notes.length
    
    const remNote = notes.filter((note)=>note.title !== title)
  
    const newL = remNote.length
        if(newL < prev)
    {
        console.log(errMsg('Removing the note with title : ' + title)) 
        saveNotes(remNote)
    }


        else { console.log(errMsg('No note with title : ' + title)) }
}


const saveNotes=(notes)=>{
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON )
}



const loadNotes =()=>{
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch(e){
        return []
    }
}



module.exports = {

addNote: addNote,
removeNote: removeNote,
listNotes : listNotes,
readNotes: readNotes
}