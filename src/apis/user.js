import axios from "axios";

export default axios.create({
    baseURL: 'https://api.olmecatest.website/api'
});