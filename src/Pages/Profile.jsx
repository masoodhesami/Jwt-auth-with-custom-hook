import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom"

import Row from "../Components/Row";
import UserData from "../Components/UserData";
import LogoutButton from "../Components/LogoutButton";
import useJwt from "../Hooks/useJWT"

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = React.useState({});
    const {logout, sendPostRequest, refreshToken} = useJwt()
    const userHandler = async () => {
        if (localStorage.getItem("access")) {
            const refreshData = await refreshToken()
            console.log(refreshData);
            const data = await sendPostRequest("http://127.0.0.1:4000/api/user", refreshData);
            setUser(data.data.user);
            console.log(data)
        } else {
            navigate("/login");
        }
    }
    const logOutHandler = async () => {
        const result = await logout();
        navigate("/login")
    }
    useEffect(() => {
        const finalData = userHandler();
        console.log(finalData);
    }, []);

    return (
        <div className="container">
            <Row>
                <UserData label="Name">{user.name}</UserData>
                <UserData label="Family">{user.lastname}</UserData>
            </Row>

            <Row>
                <UserData label="Phone">{user.phone}</UserData>
                <UserData label="Address">{user.address}</UserData>
            </Row>

            <Row>
                <UserData label="Email">{user.email}</UserData>
                <UserData label="Password">{user.password}</UserData>
            </Row>

            <LogoutButton onClick={logOutHandler}/>
        </div>
    );
};

export default Profile;
