import { LoginManager, AccessToken, Profile} from 'react-native-fbsdk-next'
import { checkUser, updateUser } from '../store/modules/app/actions'
import { useDispatch } from 'react-redux'


const dispatch = useDispatch()
export const handleLoginFacebook = async () => {
   
    await LoginManager.logInWithPermissions(["public_profile"])
    .then(result => {

        if(result.isCancelled) {
            console.log("Cancelado")
            
        }
        else {

            Profile.getCurrentProfile().then( currentProfile => {
                // console.log(currentProfile.userID)
    
                
                 dispatch(updateUser({
                    userID: currentProfile.userID,
                    name: currentProfile.name,
                    email: currentProfile.email,
                    imageURL: currentProfile.imageURL,
                    accessToken: "123",
                    type: "M"
                }))
                // dispatch(checkUser())
                dispatch(checkUser())


            })
            // AccessToken.getCurrentAccessToken().then(
            //     (data) => {return data.accessToken}

            // )
            // dispatch(checkUser())


        }
    })
    // dispatch(checkUser())

}