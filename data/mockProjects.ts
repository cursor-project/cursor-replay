import { Project } from '@/types';

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'AI 聊天应用',
    description: '使用 Next.js 和 OpenAI API 构建的现代化聊天应用，支持实时对话、历史记录和多种 AI 模型切换。',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    demoUrl: 'https://example.com/chat-demo',
    createdAt: '2024-01-15T10:30:00Z',
    tags: ['Next.js', 'TypeScript', 'OpenAI', 'Tailwind CSS'],
    stars: 342,
    views: 1250,
    replays: [
      {
        id: 'r1',
        timestamp: '2024-01-15T10:30:00Z',
        prompt: '创建一个现代化的 AI 聊天界面，使用 Next.js 和 Tailwind CSS，界面要简洁美观',
        model: 'Claude 3.5 Sonnet',
        mcp: ['filesystem', 'github'],
        files: [
          {
            path: 'app/page.tsx',
            language: 'typescript',
            content: `import ChatInterface from '@/components/ChatInterface'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">AI Chat</h1>
        <ChatInterface />
      </div>
    </main>
  )
}`,
            diff: { added: 12, removed: 0 }
          },
          {
            path: 'components/ChatInterface.tsx',
            language: 'typescript',
            content: `'use client'

import { useState } from 'react'
import MessageList from './MessageList'
import MessageInput from './MessageInput'

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  
  const handleSend = async (content: string) => {
    // Add user message
    const userMessage = { role: 'user', content, id: Date.now() }
    setMessages(prev => [...prev, userMessage])
    
    // Call AI API
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: content })
    })
    
    const data = await response.json()
    setMessages(prev => [...prev, data])
  }
  
  return (
    <div className="bg-gray-800 rounded-lg shadow-xl p-6">
      <MessageList messages={messages} />
      <MessageInput onSend={handleSend} />
    </div>
  )
}`,
            diff: { added: 31, removed: 0 }
          }
        ]
      },
      {
        id: 'r2',
        timestamp: '2024-01-15T10:45:00Z',
        prompt: '添加消息历史记录功能，使用 localStorage 保存对话',
        model: 'Claude 3.5 Sonnet',
        files: [
          {
            path: 'hooks/useLocalStorage.ts',
            language: 'typescript',
            content: `import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        setStoredValue(JSON.parse(item))
      }
    } catch (error) {
      console.error(error)
    }
  }, [key])
  
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }
  
  return [storedValue, setValue] as const
}`,
            diff: { added: 28, removed: 0 }
          }
        ]
      }
    ],
    cursorRules: `# AI Chat Application Cursor Rules

## Code Style
- Use TypeScript with strict mode
- Prefer functional components with hooks
- Use Tailwind CSS for styling

## File Structure
- Components in /components
- Hooks in /hooks
- API routes in /app/api

## Best Practices
- Always handle loading and error states
- Use proper TypeScript types
- Implement proper error boundaries`
  },
  {
    id: '2',
    title: 'Todo 应用 with 动画',
    description: '功能完整的 Todo 应用，包含优雅的动画效果、本地存储和拖拽排序功能。',
    thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
    createdAt: '2024-01-14T15:20:00Z',
    tags: ['React', 'Framer Motion', 'DnD Kit', 'Zustand'],
    stars: 128,
    views: 856,
    replays: [
      {
        id: 'r3',
        timestamp: '2024-01-14T15:20:00Z',
        prompt: '创建一个 Todo 应用，要有漂亮的动画效果，支持添加、删除、完成任务',
        model: 'GPT-4',
        mcp: ['filesystem'],
        files: [
          {
            path: 'src/App.tsx',
            language: 'typescript',
            content: `import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TodoItem from './components/TodoItem'
import AddTodo from './components/AddTodo'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  
  const addTodo = (text: string) => {
    setTodos([...todos, {
      id: Date.now(),
      text,
      completed: false
    }])
  }
  
  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }
  
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }
  
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">My Todos</h1>
        <AddTodo onAdd={addTodo} />
        <AnimatePresence>
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}`,
            diff: { added: 45, removed: 0 }
          }
        ]
      }
    ]
  },
  {
    id: '3',
    title: '个人作品集网站',
    description: '响应式的个人作品集网站，包含项目展示、技能介绍和联系表单，支持深色模式。',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    demoUrl: 'https://example.com/portfolio',
    createdAt: '2024-01-13T09:15:00Z',
    tags: ['Next.js', 'Three.js', 'GSAP', 'EmailJS'],
    stars: 256,
    views: 2340,
    replays: [
      {
        id: 'r4',
        timestamp: '2024-01-13T09:15:00Z',
        prompt: '创建一个现代化的个人作品集网站，要有 3D 效果和平滑的滚动动画',
        model: 'Claude 3.5 Sonnet',
        files: [
          {
            path: 'components/Hero.tsx',
            language: 'typescript',
            content: `import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere } from '@react-three/drei'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="h-screen relative">
      <Canvas className="absolute inset-0">
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Sphere args={[1, 32, 32]}>
          <meshStandardMaterial color="purple" />
        </Sphere>
        <OrbitControls enableZoom={false} />
      </Canvas>
      
      <div className="relative z-10 h-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold mb-4">John Doe</h1>
          <p className="text-xl text-gray-600">Full Stack Developer</p>
        </motion.div>
      </div>
    </section>
  )
}`,
            diff: { added: 32, removed: 0 }
          }
        ]
      }
    ]
  },
  {
    id: '4',
    title: '实时协作白板',
    description: '支持多人实时协作的在线白板应用，可以绘图、添加便签和实时同步。',
    thumbnail: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=600&fit=crop',
    createdAt: '2024-01-12T14:00:00Z',
    tags: ['React', 'Socket.io', 'Canvas API', 'Redis'],
    stars: 89,
    views: 567,
    replays: [
      {
        id: 'r5',
        timestamp: '2024-01-12T14:00:00Z',
        prompt: '创建一个实时协作白板，支持绘画和多用户同步',
        model: 'GPT-4',
        mcp: ['filesystem', 'websocket'],
        files: [
          {
            path: 'src/components/Whiteboard.tsx',
            language: 'typescript',
            content: `import { useEffect, useRef } from 'react'
import { io } from 'socket.io-client'

export default function Whiteboard() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const socketRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    socketRef.current = io('http://localhost:3001')
    
    let isDrawing = false
    
    const startDrawing = (e: MouseEvent) => {
      isDrawing = true
      draw(e)
    }
    
    const draw = (e: MouseEvent) => {
      if (!isDrawing) return
      
      ctx.lineWidth = 2
      ctx.lineCap = 'round'
      ctx.strokeStyle = 'black'
      
      ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop)
      
      // Emit drawing data
      socketRef.current.emit('draw', {
        x: e.clientX - canvas.offsetLeft,
        y: e.clientY - canvas.offsetTop
      })
    }
    
    const stopDrawing = () => {
      if (!isDrawing) return
      isDrawing = false
      ctx.beginPath()
    }
    
    canvas.addEventListener('mousedown', startDrawing)
    canvas.addEventListener('mousemove', draw)
    canvas.addEventListener('mouseup', stopDrawing)
    
    return () => {
      socketRef.current.disconnect()
    }
  }, [])
  
  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      className="border border-gray-300 rounded-lg"
    />
  )
}`,
            diff: { added: 62, removed: 0 }
          }
        ]
      }
    ]
  }
]; 