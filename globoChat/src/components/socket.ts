import {io} from 'socket.io-client';

export const socket = io('http://10.0.2.16:3000', {
    autoConnect:false
});