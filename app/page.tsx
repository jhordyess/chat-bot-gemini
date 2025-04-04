'use client'
import { useState } from 'react'

export default function Home() {
  const [messages, setMessages] = useState([{ message: 'Ask me anything', role: 'model' }])
  const [input, setInput] = useState('')

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = { message: input, role: 'user' }
    setMessages(prev => [...prev, userMessage, { message: 'Typing...', role: 'model' }])

    setInput('')

    // Simulate API response
    setTimeout(() => {
      setMessages(prev => {
        const updatedMessages = [...prev]
        updatedMessages.pop() // Remove "Typing..."
        updatedMessages.push({
          message: `Response to: ${input}`,
          role: 'model'
        })
        return updatedMessages
      })
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-md">
        <header className="bg-blue-500 py-4 text-center text-white">
          <h1 className="text-lg font-bold">Easy Bot</h1>
        </header>
        <div className="flex h-96 flex-col space-y-4 overflow-y-auto p-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`rounded-lg px-4 py-2 ${
                  msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center border-t p-4">
          <input
            type="text"
            className="flex-1 rounded-lg border px-4 py-2"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
          />
          <button
            className="ml-2 rounded-lg bg-blue-500 px-4 py-2 text-white"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
