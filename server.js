import { db } from "./firebase.config.js"
import express from "express"
import http from "http"
import { Server } from "socket.io";
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    setDoc,
    onSnapshot
  } from "firebase/firestore";
const app = express()
const server = http.createServer(app) //
const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: [ "GET", "POST" ]
	}
});




const updateUser= async function(userID,connectionID){
    try{ 
        const userRef = doc(db,"users",userID)
        await updateDoc(userRef, {
            connectionID:connectionID
        });



    }catch(err){
        console.log(err.message)
    }
}

io.on("connection", (socket) => {	
    socket.emit("me", socket.id)

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	})

	socket.on("callUser", (data) => {
        io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
        console.log("calling")
	})
        
	socket.on("saveConnectionID", (data) => {
        console.log(data.userId)
        console.log(socket.id)
        updateUser(data.userId,socket.id)
        console.log("saved I guess")
	})


	socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal)
        console.log("accepted") 
	})
})

server.listen(5000, () => console.log("server is running on port 5000"))