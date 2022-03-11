import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom"
import Card from "../Components/Card";
import Input from "../Components/Input";
import NotRobot from "../Components/NotRobot";
import LoginButton from "../Components/LoginButtons";
import ErrorMessage from "../Components/ErrorMessage";
import useJWT from "../Hooks/useJWT"


const Login = (props) => {
        let navigate = useNavigate();
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [data, setData] = useState([]);
        const [noRobot, setNORobot] = useState(true);
        const [loggedIn, setLoggedIn] = useState(true);
        const [unValidMail, setUnValidMail] = useState(true);
        const [navigator, setNavigator] = useState(false);
        const {login} = useJWT();

        function validateEmail(email) {
            let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (email.match(regexEmail)) {
                setUnValidMail(false);
                return true;
            } else {
                setUnValidMail(true);
                return false;
            }
        }

        const navigateUser = () => {
            if (navigator === true && data) {
                return navigate("/");
            }
        }

        useEffect(() => {
            validateEmail(email);
            navigateUser()
        }, [navigator, data, email, navigateUser])

        const clickHandler = async () => {
            try {
                const accessData = await login(email, password);
                if (accessData.access) {
                    setData(accessData);
                    setLoggedIn(true);
                    setNavigator(true);
                    console.log(accessData);
                }

            } catch (err) {
                setPassword("");
                setNORobot(false);
                setLoggedIn(false);
                setNavigator(false);
            }
        }
        const onChangeEmail = (e) => {
            setEmail(e.target.value);
            validateEmail(e.target.value)
            console.log(validateEmail(e.target.value))
        }


        return (
            <Card>
                <h3>Login</h3>

                <Input
                    data-testid="email"
                    label="✉️ Email"
                    type="email"
                    value={email}
                    onChange={(e) => onChangeEmail(e)}
                />

                <Input
                    data-testid="password"
                    label="🔑 Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {loggedIn === false &&
                <>
                    <NotRobot checked={noRobot} onChange={() => {
                        setNORobot(!noRobot)
                    }}/>
                    <ErrorMessage/>
                </>}
                <LoginButton onClick={clickHandler} disabled={!(password && email && !unValidMail)}
                />
            </Card>
        );
    }
;

export default Login;
