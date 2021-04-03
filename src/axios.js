import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-react-burger-a2c92-default-rtdb.firebaseio.com/'
});

// instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

export default instance;