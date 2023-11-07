import { API_ENDPOINT } from "../../config/constants";

const updatePreference = async (Steams: any[], Ssports: any[]) => {
    const token = localStorage.getItem('authToken');
    console.log(token);
    try {
        const preferences = { Steams, Ssports };
        const res = await fetch(`${API_ENDPOINT}/user/preferences`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ preferences }),
          });
        const bodystatus = JSON.stringify({ Steams, Ssports })
        console.log(bodystatus);
        if (!res.ok)
        console.log("Failed to upload")
    } catch (error) {
        console.log("error in updating the preferences")
    }
    
};
export default updatePreference;