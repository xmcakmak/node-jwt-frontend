import { createContext, useState } from "react"

export const GlobalContext = createContext<any>({})

export const GlobalProvider = (props: any) => {
    const [user, setUser] = useState({});
	return (
		<GlobalContext.Provider value={{ user: user, token:"", setUser }}>
			{props.children}
		</GlobalContext.Provider>
	)
}
