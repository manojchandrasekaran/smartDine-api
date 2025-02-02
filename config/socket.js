import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import config from './environment/config.js';


const socketIo = {};


const allowedOrigins = [
  'http://localhost:3000',
];

function initializeSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: allowedOrigins,
    },
  });


  // Middleware for Socket.IO authentication
  io.engine.use((req, res, next) => {
    const isHandshake = req._query.sid === undefined;
    if (!isHandshake) {
      return next();
    }
  
    const header = req.headers['authorization'];
  
    if (!header) {
      return next(new Error('no token'));
    }
  
    if (!header.startsWith('Bearer ')) {
      return next(new Error('invalid token'));
    }
  
    const token = header.substring(7);
  
    jwt.verify(token, config.SECRET_KEY, (err, decoded) => {
      if (err) {
        return next(new Error('invalid token'));
      }
      req.user = decoded;
      next();
    });
  });

  // Handle connections
  io.on('connection', async(socket) => {
    const userId = socket.request.user.id;
    console.log(userId);

    socket.join(`user:${userId}`);
    
    const sockets = await io.in(`user:${userId}`).fetchSockets();

    console.log(userId, '=====ROOM=====', sockets.map(item => item.id));
  });
  io.engine.on('connection_error', (err) => {
    // console.log(err.req);      // the request object
    console.log(err.code);     // the error code, for example 1
    console.log(err.message);  // the error message, for example "Session ID unknown"
    console.log(err.context);  // some additional error context
  });
 
  socketIo.current = io;

  return io;
}

export default {
  initializeSocket,
  io: socketIo
};
