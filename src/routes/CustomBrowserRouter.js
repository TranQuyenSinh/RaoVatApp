import { Router } from 'react-router-dom'
import { useRef, useState, useLayoutEffect } from 'react'
import { createBrowserHistory } from 'history'

// Can be used to manage navigation state outside of React components
// ex : Redux, Axios interceptors, ...
export const history = createBrowserHistory()

export function CustomBrowserRouter({ basename, children }) {
    const historyRef = useRef()
    if (historyRef.current == null) {
        historyRef.current = history
    }
    const [state, setState] = useState({
        action: historyRef.current.action,
        location: historyRef.current.location,
    })

    useLayoutEffect(() => historyRef.current.listen(setState), [historyRef.current])

    return (
        <Router
            basename={basename}
            children={children}
            location={state.location}
            navigationType={state.action}
            navigator={historyRef.current}
        />
    )
}
