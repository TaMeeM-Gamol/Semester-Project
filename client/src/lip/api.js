import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASEURL,
})

export const getAuthHeaders = async (getToken) => {
    const token = await getToken()
    return {
        Authorization: `Bearer ${token}`,
    }
}

export default api;
