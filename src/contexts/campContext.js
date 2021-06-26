import {createContext, useState} from "react"
export const campContext = createContext()
const {Provider} = campContext
export function CampProvider({children}) {
    const [newOneAdded, setNewOneAdded] = useState(0)
    return <>
        <Provider value={{newOneAdded, setNewOneAdded}}>{
            children}</Provider>
    </>
}
