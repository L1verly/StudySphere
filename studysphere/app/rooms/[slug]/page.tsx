"use client"

import { useRetrieveUserQuery } from '@/redux/features/authApiSlice'
import { useCreateMessageMutation, useGetMessagesQuery } from '@/redux/features/messageApiSlice'
import { useGetRoomQuery } from '@/redux/features/roomApiSlice'
import moment from 'moment'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import '@/styles/Room.css'
import { TextareaAutosize } from '@mui/material'




function Room({ slug }) {
    const { data: user } = useRetrieveUserQuery()
    const { data: messageList } = useGetMessagesQuery()
    const messages = messageList?.results
    
    const { data: room } = useGetRoomQuery(slug)
    
    const [createMessage] = useCreateMessageMutation()

    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [input, setInput] = useState<string>('')

    const sendMessage = async () => {
        if (!input) return
        setIsLoading(true)

        createMessage({ room: room?.id, user: user?.id, body: input })
    }

    return (
        <main className="profile-page layout layout--2">
            <div className="container">

                <div className="room">
                    <div className="room__top">
                        <div className="room__topLeft">
                            <Link href={'/'}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                    <title>arrow-left</title>
                                    <path
                                        d="M13.723 2.286l-13.723 13.714 13.719 13.714 1.616-1.611-10.96-10.96h27.625v-2.286h-27.625l10.965-10.965-1.616-1.607z">
                                    </path>
                                </svg>
                            </Link>
                            <h3>{room?.name}</h3>
                        </div>
                        {room?.host === user?.id ? (
                            <div className="room__topRight">
                                <Link href={`update-room/${room?.slug}`}>
                                    <svg enable-background="new 0 0 24 24" height="32" viewBox="0 0 24 24" width="32"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <title>edit</title>
                                        <g>
                                            <path d="m23.5 22h-15c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h15c.276 0 .5.224.5.5s-.224.5-.5.5z" />
                                        </g>
                                        <g>
                                            <g>
                                                <path
                                                    d="m2.5 22c-.131 0-.259-.052-.354-.146-.123-.123-.173-.3-.133-.468l1.09-4.625c.021-.09.067-.173.133-.239l14.143-14.143c.565-.566 1.554-.566 2.121 0l2.121 2.121c.283.283.439.66.439 1.061s-.156.778-.439 1.061l-14.142 14.141c-.065.066-.148.112-.239.133l-4.625 1.09c-.038.01-.077.014-.115.014zm1.544-4.873-.872 3.7 3.7-.872 14.042-14.041c.095-.095.146-.22.146-.354 0-.133-.052-.259-.146-.354l-2.121-2.121c-.19-.189-.518-.189-.707 0zm3.081 3.283h.01z" />
                                            </g>
                                            <g>
                                                <path
                                                    d="m17.889 10.146c-.128 0-.256-.049-.354-.146l-3.535-3.536c-.195-.195-.195-.512 0-.707s.512-.195.707 0l3.536 3.536c.195.195.195.512 0 .707-.098.098-.226.146-.354.146z" />
                                            </g>
                                        </g>
                                    </svg>
                                </Link>
                                <Link href={'delete-room'}>
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                        <title>remove</title>
                                        <path
                                            d="M27.314 6.019l-1.333-1.333-9.98 9.981-9.981-9.981-1.333 1.333 9.981 9.981-9.981 9.98 1.333 1.333 9.981-9.98 9.98 9.98 1.333-1.333-9.98-9.98 9.98-9.981z">
                                        </path>
                                    </svg>
                                </Link>
                            </div>)
                            : (<></>)}
                    </div>
                    <div className="room__box scroll">
                        <div className="room__header scroll">
                            <div className="room__info">
                                <h3>{room?.name}</h3>
                                <span>{moment(room?.created).from(moment())}</span>
                            </div>
                            <div className="room__hosted">
                                <p>Hosted By</p>
                                <Link href="{% url 'user-profile' room.host.id %}" className="room__author">
                                    <div className="avatar avatar--small">
                                        <img src="{{room.host.avatar.url}}" />
                                    </div>
                                    {/* <span>@{ room.host. }</span>  TODO*/}
                                </Link>
                            </div>
                            <div className="room__details">
                                {room?.description}
                            </div>
                            <span className="room__topics">{room?.topic}</span>
                        </div>

                        <div className="room__conversation">
                            <div className="threads scroll">
                                {messages?.map(message => (
                                    <div className="thread">
                                        <div className="thread__top">
                                            <div className="thread__author">
                                                <link href="{% url 'user-profile' message.user.id %}" className="thread__authorInfo">
                                                    <div className="avatar avatar--small">
                                                        <img src="{{message.user.avatar.url}}" />
                                                    </div>
                                                    {/* <span>@{message.user}</span> TODO */}
                                                </link>
                                                <span className="thread__date">{moment(message?.created).from(moment())}</span>
                                            </div>

                                            {message.user === user?.id ? (
                                                <Link href={'/delete-message/'}>
                                                    <div className="thread__delete">
                                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                                            <title>remove</title>
                                                            <path
                                                                d="M27.314 6.019l-1.333-1.333-9.98 9.981-9.981-9.981-1.333 1.333 9.981 9.981-9.981 9.98 1.333 1.333 9.981-9.98 9.98 9.98 1.333-1.333-9.98-9.98 9.98-9.981z">
                                                            </path>
                                                        </svg>
                                                    </div>
                                                </Link>) : (<></>)}
                                        </div>
                                        <div className="thread__details">
                                            {message.body}
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>

                    </div>
                    <div className="room__message">
                        <TextareaAutosize
                            ref={textareaRef}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault()
                                    sendMessage()
                                }
                            }}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={'Write a message...'}
                        />
                    </div>
                </div>
                {/* <!-- Room End --> */}

                {/* <!--   Start --> */}
                <div className="participants">
                    <h3 className="participants__top">Participants <span>({room?.participants.length} Joined)</span></h3>
                    <div className="participants__list scroll">
                        {room?.participants.map(user => (
                            <Link href={'user/profile/'} className="participant"> {/*TODO profile id*/}
                                <div className="avatar avatar--medium">
                                    {/* <img src="{{user.avatar.url}}" /> TODO */}
                                </div>
                                <p>
                                    @{user?.username}
                                </p>
                            </Link>))}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Room