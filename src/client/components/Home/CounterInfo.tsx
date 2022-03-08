import React, { useEffect, useState } from 'react'

const CounterInfo = (props) => {
    const [isActive, setIsActiveProps] = useState<boolean>()
    const [isServing, setIsServingProps] = useState<boolean>()
    const [id, setCounterIdProps] = useState<number>()
    const [tokenId, setTokenIdProps] = useState<number>()

    useEffect(() => {
        const counterListener = (counter) => {
            if (counter && counter.data && counter.data.id === props.src.id) {
                setIsActiveProps(counter.data.isActive)
                setIsServingProps(counter.data.isServing)
                setCounterIdProps(counter.data.id)
                setTokenIdProps(counter.data.tokenId)
            }
        }

        if (props && props.src) {
            setIsActiveProps(props.src.isActive)
            setIsServingProps(props.src.isServing)
            setCounterIdProps(props.src.id)
            setTokenIdProps(props.src.tokenId)
        }

        props.socket.on("counter", counterListener)
    }, [])

    return (
        <>
            <div className={"card mb-3 box-shadow " + (isActive ? 'bg-active' : 'bg-in-active')}>
                <div className="card-header">
                    <h3 className="my-1 font-weight-normal">Counter {id}</h3>
                    <div className={"counter-status " + (isServing ? 'in-active' : 'active')}></div>
                </div>
                <div className="card-body">
                    <h1 className="card-title ">{tokenId ? tokenId : '-'}</h1>
                </div>
            </div>
        </>
    )
}

export default CounterInfo