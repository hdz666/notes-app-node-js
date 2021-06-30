/*const add = require('./utils.js')
const sum = add(4,5)
console.log(sum)*/


const chalk = require('chalk')
const { demandOption, argv } = require('yargs')
const yargs = require('yargs')
const notes = require('./notes.js')
const getNotes = require('./notes.js')

const errMsg = chalk.red.bold
const sucMsg = chalk.green.bold
const statMsg = chalk.blue.underline
//customize yargs version
yargs.version('1.1.0')

//create add command 
yargs.command(
    {
        command : 'add',
        describe:'Add a new note',
        builder:{
            
            title:{
                describe:'Note Title',
                demandOption : true,
                type:'string'
            }, 

            body:{
                describe:'Note Body',
                demandOption : true,
                type:'string'
            }

        },
        handler(argv){
            notes.addNote(argv.title, argv.body)
        }
    }
)
yargs.command(
    {
        command : 'remove',
        describe:'Remove the note',
        builder: {
            title: {
                describe : 'Note Title',
                demandOption : true,
                type:'string' 
            }
        },
        handler(argv){
            notes.removeNote(argv.title)
        }
    }
)


yargs.command(
    {
        command : 'read',
        describe:'Read the note',
        builder:{
            title:{
                describe : 'Note Title',
                demandOption : true,
                type:'string' 
            }
        },
        handler(argv){
            notes.readNotes(argv.title)
        }
    }
)


yargs.command(
    {
        command : 'list',
        describe:'List all the notes',
        handler(){
            notes.listNotes()
        }
    }
)
yargs.parse()
//console.log(yargs.argv)
/*
const command = process.argv[2]

if(command === 'add'){
    console.log(sucMsg('Adding Note'))
}

else if(command === 'remove'){
    console.log(errMsg('Removing Note'))
}*/