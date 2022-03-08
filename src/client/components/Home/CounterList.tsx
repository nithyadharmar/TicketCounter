import React, { useEffect, useState } from 'react'
import { Counter } from "../../models/token"
import CounterInfo from "./CounterInfo"
import { counterList } from '../../services/tokenService'

const CounterList = ({ socket }) => {
    const [counter1, setCounter1Props] = useState<Counter>()
    const [counter2, setCounter2Props] = useState<Counter>()
    const [counter3, setCounter3Props] = useState<Counter>()
    const [counter4, setCounter4Props] = useState<Counter>()

    useEffect(() => {
        getActiveCounters()
    }, [])

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
            <div className="container pt-4">
                <div className="px-2 py-4 pt-md-4 pb-md-3 mx-auto border-top text-left">
                    <h3 className="mb-2">Counter Status</h3>
                </div>
                <div className="card-deck mb-2 text-center">
                    {counter1 && (<CounterInfo socket={socket} src={counter1} />)}
                    {counter2 && (<CounterInfo socket={socket} src={counter2} />)}
                    {counter3 && (<CounterInfo socket={socket} src={counter3} />)}
                    {counter4 && (<CounterInfo socket={socket} src={counter4} />)}
                </div>
            </div>
            <footer className="pt-4 my-md-5 pt-md-5 border-top">
            </footer>
        </>
    )
}

export default CounterList
