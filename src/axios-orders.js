import axios from 'axios';

const instance=axios.create({
    baseURL: 'https://react-burger-app-fc658-default-rtdb.firebaseio.com/'
})

export default instance;