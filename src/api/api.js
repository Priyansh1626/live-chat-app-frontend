import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3999"
})

export default instance;
