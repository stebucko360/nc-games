import { createContext, useState } from "react";

export const UserDetailsContext = createContext();

export const UserDetailsProvider = ({ children }) => {

    const [userDetails, setUserDetails] = useState([]);
    
    return (
        <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
            {children}
        </UserDetailsContext.Provider>
    );

}
