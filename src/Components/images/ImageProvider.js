import React, { createContext, useState } from "react"
import Axios from 'axios'

// The context is imported and used by individual components that need data
export const ImageContext = createContext()
// This component establishes what data can be used.
export const ImageProvider = (props) => {
    //a state variable to store the return address of the image
    const [imagePublicId, setImagePublicId] = useState("")
    //creates an API post request to cloudinary
    const upLoadImage = (formData) => {
        return Axios.post("http://api.cloudinary.com/v1_1/nch66862/image/upload", formData)
            .then(response => setImagePublicId(response.data.secure_url))
    }
    //exposes all of the functions and data from the provider in the context
    return (
        <ImageContext.Provider value={{
            upLoadImage, imagePublicId, setImagePublicId
        }}>
            {props.children}
        </ImageContext.Provider>
    )
}