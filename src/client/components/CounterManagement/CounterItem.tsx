import React, { useEffect, useState } from 'react'
import { Counter, Token } from "../../models/token"
import { assignToken, counterInfo, unassignedTokens, updateCounterStatus, updateTokenStatus } from '../../services/tokenService'

const CounterItem = (props) => {
    const [isActive, setIsActiveProps] = useState<boolean>()
    const [isServing, setIsServingProps] = useState<boolean>()
    const [id, setCounterIdProps] = useState<number>()
    const [tokenId, setTokenIdProps] = useState<number>()
    const [tokenCount, setTokenCountProps] = useState<number>()

    useEffect(() => {
        const tokenListener = (tokens) => {
            if (tokens)
                setTokenCountProps(tokens.length)
        }

        if (props && props.src) {
            setIsActiveProps(props.src.isActive)
            setIsServingProps(props.src.isServing)
            setCounterIdProps(props.src.id)
            setTokenIdProps(props.src.tokenId)
            setTokenCountProps(props.tokenCount)
        }

        props.socket.on("token", tokenListener)
    }, [])

    const updateCounter = (): void => {
        updateCounterStatus(id)
            .then((counter: Counter | any) => {
                if (counter && counter.data) {
                    refreshCounter()
                }
            })
            .catch((err: Error) => console.log(err))
    }

    const dequeueToken = (): void => {
        updateTokenStatus(tokenId)
            .then((token: Token | any) => {
                if (token) {
                    refreshToken()
                    refreshCounter()
                }
            })
            .catch((err: Error) => console.log(err))
    }

    const callNextToken = (): void => {
        assignToken(id)
            .then((token: Token | any) => {
                if (token) {
                    refreshToken()
                    refreshCounter()
                }
            })
            .catch((err: Error) => console.log(err))
    }

    const refreshToken = (): void => {
        unassignedTokens()
            .then((tokens: Token[] | any) => {
                if (tokens && tokens.data) {
                    props.socket.emit("token", tokens.data)
                }
            })
            .catch((err: Error) => console.log(err))
    }

    const refreshCounter = (): void => {
        counterInfo(id)
            .then((counter: Counter | any) => {
                if (counter && counter.data) {
                    setIsActiveProps(counter.data.isActive)
                    setIsServingProps(counter.data.isServing)
                    setCounterIdProps(counter.data.id)
                    setTokenIdProps(counter.data.tokenId)
                    props.socket.emit("counter", counter)
                }
            })
            .catch((err: Error) => console.log(err))
    }

    if (props) {
        return (
            <>
                <div className="card mb-4 box-shadow">
                    <div className={"card-header " + (isActive && isServing ? 'active-kiosk' : (!isActive ? 'in-active-kiosk' : 'bg-idle'))}>
                        <h3 className="my-1 font-weight-normal">Counter {id}</h3>
                    </div>
                    <div className="py-3 py-md-5 card-body">
                        <button type="button" className={"btn btn-lg btn-block mb-3 " + (!isActive ? 'btn-outline-success' : 'btn-outline-danger')} disabled={isServing} onClick={() => updateCounter()}>
                            {isActive ? 'Go Offline' : 'Go Online'}
                        </button>
                        <button type="button" className="btn btn-lg btn-block btn-outline-primary mb-3" disabled={!isActive || !isServing} onClick={() => dequeueToken()}>
                            Complete Token
                        </button>
                        <button type="button" className="btn btn-lg btn-block btn-primary" disabled={!isActive || isServing || tokenCount < 1} onClick={() => callNextToken()}>
                            Call Next
                        </button>
                    </div>
                </div>
            </>
        )
    }
}

export default CounterItem