import io from 'socket.io-client';

const socket = () => {
    return io('http://192.168.18.3:8000')
}

export default socket