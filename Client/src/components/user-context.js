import { createContext, useState } from "react";

const UserContext = createContext({
    loginStatus: false,
    setLogin: (val) => {}
});

const UserContextProvider = (props) => {
    const [isLogin, setIsLogin] = useState(false);

    function setLoginStatus(val) {
        setIsLogin(val);
    }

    const user = {
        loginStatus: isLogin,
        setLogin: setLoginStatus
    }

    return <UserContext.Provider value={user}>
        {props.children}
    </UserContext.Provider>
}

export default UserContext;

export { UserContextProvider };
