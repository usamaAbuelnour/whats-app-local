const http = require('http');
const express = require('express');
const {Server} = require('socket.io');
const nodeStorage = require('localStorage');
const fs = require('fs');



const server = http.createServer(express);

server.listen(2000, ()=>console.log('Server up and running'));

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});



io.on('connection', socket=>{
    console.log('connection established');

    

    socket.on('join', data=>{
        nodeStorage.setItem('contact', data.name);
        socket.join(1);
        console.log(`${data.name} joined`);
    })
    socket.on('initUser', data=>{
        console.log(`${data.name} joined with id ${socket.id}`);
    });

    socket.on('send', data=>{
        

        // fs.readFile('../src/DB/contacts.json', 'utf-8', (err, contacts)=>{
        //     if(err) throw err;
        //     else {
        //         let parsed = JSON.parse(contacts);
        //         let index = parsed.findIndex(cont=>cont.name == data.name);
        //         parsed[index].chatHistory.push({content: data.message});
                
        //         fs.writeFile('../src/DB/contacts.json', JSON.stringify(parsed, null, 4), err=>{
        //             if(err) throw err;
        //             else console.log('done')
        //         })

        //     }
        // });

        socket.to(1).emit('receive', data.message);
        
    });

    socket.on('addContact', data=>{
        fs.readFile('../src/DB/contacts.json', 'utf-8', (err, contacts)=>{
            if(err) throw err;
            else{
                let parsed = JSON.parse(contacts);
                parsed.push({name: data, userChatHistory: [], contactChatHistory: []});
                fs.writeFile('../src/DB/contacts.json', JSON.stringify(parsed, null, 4), err=>{
                    if(err) throw err;
                    else console.log('done')
                })
            }
        });
    })

    socket.on('fullChat', data=>{
        fs.readFile('../src/DB/temp.json', 'utf-8', (err, fullChat)=>{
            if(err) throw err
            else{
                let parsed = JSON.parse(fullChat);
                parsed.concat(data);
                fs.writeFile('../src/DB/temp.json', JSON.stringify(data, null, 4), err=>{
                    if(err) throw err
                    else console.log('done fullchat');
                })
            }
        })
    });

    socket.on('updateChatHistory', data=>{
        fs.writeFile('../src/DB/contacts.json', JSON.stringify(data, null, 4), err=>{
            if(err) throw err
            else console.log('updated');
        })
    });

    socket.on('disconnect', () => {
        console.log(`${nodeStorage.getItem('contact')} disconnected`);
        socket.broadcast.emit('DC', nodeStorage.getItem('room'))
    });

    
});