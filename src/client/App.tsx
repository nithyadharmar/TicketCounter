import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CounterManagement from "./components/CounterManagement/CounterManagement"
import Home from "./components/Home/Home"
import io from 'socket.io-client'

function App() {
    const [socket, setSocket] = useState(null)
    useEffect(() => {
        const newSocket = io(`https://nithya-ticket-counter.herokuapp.com`)
        setSocket(newSocket)
        return () => newSocket.close()
    }, [setSocket])
    return (
        <>
            <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 box-shadow">
                <h4 className="my-0 mr-md-auto font-weight-bold"><i className="fa fa-token"></i> Ticket Counter App</h4>
            </div>
            <Router>
                <Routes>
                    <Route path='/' element={<Home socket={socket} />} />
                    <Route path='/CounterManagement' element={<CounterManagement socket={socket} />} />
                </Routes>
            </Router>
        </>
    )
}

export default App
