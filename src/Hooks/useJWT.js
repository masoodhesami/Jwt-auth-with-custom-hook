import React from "react";
import axios from 'axios'


function useJWT() {
    const refreshToken = async () => {
        const result = await axios.post("http://127.0.0.1:4000/api/token", {
            token: localStorage.getItem("refresh")
        });
        localStorage.setItem("access", result.data.access);
        localStorage.setItem("refresh", result.data.refresh);
        return result.data;
    };

    async function login(email, password) {
        const result = await axios.post("http://127.0.0.1:4000/api/login", {
            email: email,
            password: password
        });
        localStorage.setItem("access", result.data.access)
        localStorage.setItem("refresh", result.data.refresh);
        return result.data;

    }

    const sendPostRequest = async (url, data) => {
        try {
            return await axios.post(url, data, {
                headers: {
                    "jwt": localStorage.getItem("access")
                }
            });
        } catch (err) {
            const token = await refreshToken();
            return await axios.post(url, data, {
                headers: {
                    "jwt": token.access
                }
            });
        }
    };

    const logout = async () => {
        await axios.delete("http://127.0.0.1:4000/api/logout", {
            token: localStorage.getItem("refresh")
        })
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

    };

    return {
        login,
        logout,
        refreshToken,
        sendPostRequest,
    };
}

export default useJWT;
