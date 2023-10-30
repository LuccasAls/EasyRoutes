import { createContext, useContext, useEffect, useState } from "react";
import { LoginManager, AccessToken, Profile} from 'react-native-fbsdk-next'
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
    const [authData, setAuthData] = useState();
    const [token, setToken] = useState();

    useEffect(() => {
        loadFromStorage()
        
    }, [])

    async function loadFromStorage(){
        const auth = await AsyncStorage.getItem('@AuthData')
    
        if(auth) {
           
            setAuthData(JSON.parse(auth))
        }
    }

    async function singIn() {
        const auth = await LoginManager.logInWithPermissions(["public_profile"])
        .then(result => {
        


        if (result.isCancelled) {
            console.log("Cancelado")
            
        }
        else {
            const accessToken = async () => await  AccessToken.getCurrentAccessToken().then(
                 (data) => {
                    setToken(data.accessToken)
                   
                    return data.accessToken
                }
            )

            Profile.getCurrentProfile().then( async currentProfile => {
                const tokenId = await accessToken()
                setAuthData({
                    name: currentProfile.name,
                    firstName: currentProfile.firstName,
                    userID: currentProfile.userID,
                    imageURL: currentProfile.imageURL,
                    type: "M",
                    accessToken: tokenId
                })


                await AsyncStorage.setItem('@AuthData', JSON.stringify(

                    {
                        name: currentProfile.name,
                        firstName: currentProfile.firstName,
                        userID: currentProfile.userID,
                        imageURL: currentProfile.imageURL,
                        type: "M",
                        accessToken: await accessToken()
                    }
                ))

              
                
                

            })
        }
    })
        

        return auth 
    }

    async function singOut() {
        setAuthData(undefined)
        await AsyncStorage.removeItem('@AuthData')
    }


    return (
        <AuthContext.Provider
            value={{
                authData,
                singIn,
                singOut,
                token
            }}
        >
         {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    return context
}