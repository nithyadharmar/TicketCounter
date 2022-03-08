import React from 'react'
import CounterList from "./CounterList"
import TokenInfo from './TokenInfo'

const Home = ({ socket }) => {
    return (
        <>
            { socket && (<TokenInfo socket={socket} />)}
            { socket && (<CounterList socket={socket} />)}
        </>
    )
}

export default Home