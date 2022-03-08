import React, { useEffect, useState } from 'react'
import { Token, Counter } from "../../models/token"
import { counterList, unassignedTokens } from '../../services/tokenService'
import CounterItem from './CounterItem'

const CounterManagement = ({ socket }) => {
    const [counter1, setCounter1Props] = useState<Counter>()
    const [counter2, setCounter2Props] = useState<Counter>()
    const [counter3, setCounter3Props] = useState<Counter>()
    const [counter4, setCounter4Props] = useState<Counter>()
    const [tokenCount, setTokenCountProps] = useState<number>()

    useEffect(() => {
        getTokenCount()
        getActiveCounters()
    }, [])

    const getTokenCount = (): void => {
        unassignedTokens()
            .then((tokens: Token[] | any) => {
                if (tokens)
                    setTokenCountProps(tokens.data.length)
            })
            .catch((err: Error) => console.log(err))
    }

    const getActiveCounters = (): void => {
        counterList()
            .then((counters: Counter[] | any) => {
                if (counters && counters.data.length > 0) {
                    counters.data.forEach(counter => {
                        switch (counter.id) {
                            case 1:
                                setCounter1Props(counter)
                                break
                            case 2:
                                setCounter2Props(counter)
                                break
                            case 3:
                                setCounter3Props(counter)
                                break
                            case 4:
                                setCounter4Props(counter)
                                break
                        }
                    })
                }
            })
            .catch((err: Error) => console.log(err))
    }

    return (
        <>
            <div className="container">
                <div className="px-2 py-3 pt-md-4 pb-md-3 mx-auto text-left">
                    <h3 className="mb-4">Counter Management</h3>
                </div>
                <div className="card-deck mb-3 text-center">
                    {counter1 && (<CounterItem src={counter1} socket={socket} tokenCount={tokenCount} />)}
                    {counter2 && (<CounterItem src={counter2} socket={socket} tokenCount={tokenCount} />)}
                    {counter3 && (<CounterItem src={counter3} socket={socket} tokenCount={tokenCount} />)}
                    {counter4 && (<CounterItem src={counter4} socket={socket} tokenCount={tokenCount} />)}
                </div>
            </div>
        </>
    )
}

export default CounterManagement
