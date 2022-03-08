import React, { useEffect, useState } from 'react'
import { Token } from "../../models/token"
import { unassignedTokens, servingToken, lastIssuedToken, createToken } from '../../services/tokenService'

const TokenInfo = (props) => {
    const [serveToken, setServingToken] = useState<number>()
    const [issuedToken, setLastIssuedToken] = useState<number>()

    useEffect(() => {
        const tokenListener = (tokens) => {
            fetchServingToken()
            fetchLastIssuedToken()
        }
        props.socket.on("token", tokenListener)

        fetchServingToken()
        fetchLastIssuedToken()
    }, [])

    const fetchServingToken = (): void => {
        servingToken()
            .then((token: Token | any) => {
                setServingToken(token ? token.data.id : 0)
            })
            .catch((err: Error) => console.log(err))
    }

    const fetchLastIssuedToken = (): void => {
        lastIssuedToken()
            .then((token: Token | any) => {
                if (token) {
                    setLastIssuedToken(token.data.id)
                }
            })
            .catch((err: Error) => console.log(err))
    }

    const enqueueToken = (): void => {
        createToken()
            .then(() => {
                fetchLastIssuedToken()
                refreshToken()
            })
            .catch((err: Error) => console.log(err))
    }

    const refreshToken = (): void => {
        unassignedTokens()
            .then((tokens: Token[] | any) => {
                if (tokens && tokens.data)
                    props.socket.emit("token", tokens.data)
            })
            .catch((err: Error) => console.log(err))
    }

    return (
        <>
            <div className="container pt-4">
                <div className="card my-4 box-shadow take-token-card">
                    <div className="card-body text-left">
                        <table className="mb-4">
                            <tbody>
                                <tr>
                                    <td className="px-2 text-white">Now Serving</td>
                                    <td className="px-2 text-white"> : </td>
                                    <td className="px-2 text-white"><b>{serveToken}</b></td>
                                </tr>
                                <tr>
                                    <td className="px-2 text-white">Last Number</td>
                                    <td className="px-2 text-white"> : </td>
                                    <td className="px-2 text-white"><b>{issuedToken}</b></td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="button" className="px-5 btn btn-lg btn-danger" onClick={() => enqueueToken()}>Take a number</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TokenInfo
