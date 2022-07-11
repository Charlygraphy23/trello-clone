/* eslint-disable prettier/prettier */
import { io } from 'socket.io-client';

const socket = io('http://localhost:3300');

const getSocket = () => socket;

export const connectSocket = () => {
    socket.on('connect', () => {
        console.log('Connected :', socket.id);
    });
};

export const disconnectSocket = () => {

    if (socket.connected) socket.disconnect();

    socket.on('disconnect', () => {
        console.log('Disconnect :', socket.id);
    });
};

export const join = (room: string) => {
    socket.emit('join', room);
};

export const leaveRoom = (room: string) => {
    socket.emit('leave', room);
};

export default getSocket;