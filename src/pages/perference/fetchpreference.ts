import { API_ENDPOINT } from "../../config/constants"

const fetchPreference = async () => {
    try {
        const res = await fetch(`${API_ENDPOINT}/user/preferences`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                },
            })
        if (!res.ok) {
            throw new Error(await res.text())
        }
        const data = await res.json();
        console.log("Data is ", data.preferences);
        return data;
    }
    catch (error) {
        console.log(error);
    }
}
export default fetchPreference;
