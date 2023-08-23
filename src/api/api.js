import axios from "axios";

const instance = axios.create({
    baseURL: "https://friendly-chat-backend.up.railway.app"
})

export default instance;
