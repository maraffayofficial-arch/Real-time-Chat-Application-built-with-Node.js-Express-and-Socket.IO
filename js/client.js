const socket=io("http://localhost:8000");
// const socket = io("http://127.0.0.1:8000");

const form =document.getElementById("send-form");
const messageinp =document.getElementById("msg-input");
const messageContainer =document.querySelector("#container");

form.addEventListener("submit",(e)=>{
  e.preventDefault("")
  const message =messageinp.value
  append(` ${message}`,'right')
  socket.emit("send",message)
  messageinp.value=""
})
const append=(message,position)=>{
 const messageElement=document.createElement("div")
 messageElement.innerText= message;
 messageElement.classList.add('message');
 messageElement.classList.add(position);
 messageContainer.append(messageElement);
}
const nam = prompt("Enter your name to join:");
socket.emit("new-user-joined",nam);

socket.on("user-joined",nam=>{
  append(`${nam}: joined the chat` ,"left")
})

socket.on("received",data=>{
  append(`${data.nam}:${data.message} ` ,"left")
})

socket.on("left",nam=>{
  append(`${nam}:left the chat` ,"left")
})