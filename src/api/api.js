import axios from "axios";

const instance = axios.create({
    baseURL: "https://friendly-chat-backend.up.railway.app"
    // baseURL: "http://localhost:3999"
})

export default instance;
