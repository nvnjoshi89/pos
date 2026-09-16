"use-client"

import { Provider } from "react-redux"

export function StoreProvider({children}:{children:React.ReactNode}){
    return <Provider store={store}
}