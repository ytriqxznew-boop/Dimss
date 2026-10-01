const express=require('express');
const http=require('http');
const {Server}=require('socket.io');
const path=require('path');
const app=express();
const server=http.createServer(app);
const io=new Server(server,{cors:{origin:"*"}});
app.use(express.static(path.join(__dirname,'public')));
let users={};
io.on('connection',s=>{
s.on('join',n=>{users[s.id]={name:n,id:s.id};io.emit('users',Object.values(users))});
s.on('message',d=>{io.emit('message',{from:users[s.id]?.name,text:d.text,time:new Date().toLocaleTimeString(),fromId:s.id})});
s.on('disconnect',()=>{delete users[s.id];io.emit('users',Object.values(users))});
});
server.listen(process.env.PORT||3000);
