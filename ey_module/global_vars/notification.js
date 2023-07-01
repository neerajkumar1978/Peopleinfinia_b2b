
var express=require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var users={},sockets={};
io.on('connection',function(socket){

	console.log("a user connected....",socket.id);
	//console.log(socket);

	socket.on("initClient",function(data){
		console.log("socket data...",data)
		if(!users[data.userId]){
			users[data.userId]=[{socket:socket.id}];
		}
		else{
			var indx=users[data.userId].findIndex(x=>x.socket==socket.id);
			if(indx==-1)
				users[data.userId].push({socket:socket.id});
		}
		sockets[socket.id]={socket:socket,userId:data.userId};
	})
	socket.on('disconnect', function() {
      console.log('Got disconnect!');
      console.log("a user connected....",socket.id);
      if(sockets[socket.id]){
      var indx=users[sockets[socket.id]["userId"]].findIndex(x=>x.socket==socket.id);
      if(indx>-1)
      	users[sockets[socket.id]["userId"]].splice(indx,1)
  
      delete sockets[socket.id];
      }
   });
})

http.listen(1101);

module.exports={
	// saveNotification:function(data,recieverId){
	// 	return new Promise(function(resolve,reject){
	// 		User.native(function(err,collection){
 //              var oid = new ObjectId();
 //              var query={
 //                  _id:ModelService.ObjectId(User,req.body.receiverId)
 //                };
 //                collection.update(query,{
 //                  $push:{
 //                    notification:data
 //                  }
 //                },function(err,result){
 //                  err?reject(err):resolve(data._id)
 //                })
 //            })
	// 	})
	// },
	// newNotification:function(data,recieverId){
	// 	console.log("data------------------------>",data)
	// 	console.log("users--++++++++++++++++++++->",users)
	// 			console.log("users--++++++++++++++++++++->",recieverId)
	// 	if(users[recieverId]){
	// 		for(var i=0;i<users[recieverId].length;i++){
	// 			//console.log("users[recieverId][i].socket---->",users[recieverId][i].socket)
	// 			var socketId=users[recieverId][i].socket;
	// 			//console.log("sockets----------->",sockets)
	// 			if(sockets[socketId])
	// 				sockets[socketId].socket.emit("newNotification",data);
	// 		}
	// 	}
	// },
	// newfriendRequest:function(data,recieverId){
	// 	if(users[recieverId]){
	// 		for(var i=0;i<users[recieverId].length;i++){
	// 			var socketId=users[recieverId][i].socket;
	// 			sockets[socketId].socket.emit("newfriendRequest",data);
	// 		}
	// 	}
	// }
}




