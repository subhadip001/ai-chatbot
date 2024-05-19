'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

interface Message {
  from: string
  text: string
}

const Room = () => {
  const { roomId } = useParams()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState<string>('')
  const username =
    typeof window !== 'undefined' ? localStorage.getItem('username') : null
  const router = useRouter()
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!roomId) return

    const fetchMessages = async () => {
      const response = await fetch(`/api/messages?roomId=${roomId}`)
      const data = await response.json()
      console.log('data', data)
      setMessages(data.messages)
    }

    fetchMessages()

    const intervalId = setInterval(fetchMessages, 2000)
    return () => clearInterval(intervalId)
  }, [roomId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || !username) return
    await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ roomId, text: input, from: username })
    })
    setMessages(prev => [...prev, { roomId, text: input, from: username }])
    setInput('')
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  const leaveRoom = () => {
    router.push('/user-chat')
  }
  return (
    <main className="h-[90vh] py-10">
      <section className="h-full relative w-[50%] flex flex-col gap-5 mx-auto py-5 px-8 shadow-sm shadow-white rounded-md">
        <div>
          <span className="text-xl">Room Id: {roomId}</span>
          <div className="py-5 h-[60vh] overflow-y-auto userChatBox">
            {[...messages]?.reverse().map((msg, index, arr) => (
              <div
                key={index}
                className={msg.from === username ? 'text-right p-2' : " p-2"}
                ref={index === arr.length - 1 ? messagesEndRef : null}
                >
                {msg.from === username ? 'You' : msg.from}: {msg.text}
              </div>
            ))}
          </div>
          <div className="flex gap-3 absolute bottom-3 w-full left-0 px-8">
            <Input
              type="text"
              value={input}
              placeholder='Type a message'
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => {
                if (e.key === 'Enter') sendMessage()
              }}
            />
            <Button onClick={sendMessage}>Send</Button>
            <Button
              variant={'destructive'}
              onClick={leaveRoom}
            >
              Leave Room
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Room
