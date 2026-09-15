'use client'

import { useEffect, useState } from 'react'
import { Task } from '@/lib/types'
import TaskList from '@/components/TaskList'
import AddTaskModal from '@/components/AddTaskModal'
import SyncStatus from '@/components/SyncStatus'
import Link from 'next/link'

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [showModal, setShowModal] = useState(false)
  const [lastSynced, setLastSynced] = useState<Date | null>(null)
  const [syncing, setSyncing] = useState(false)

  useEffect(() => {
    fetch('/api/tasks')
      .then((r) => r.json())
      .then(setTasks)
  }, [])

  const handleAdd = async (title: string, due_date: string | null) => {
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, due_date }),
    })
    const task = await res.json()
    setTasks((prev) => [task, ...prev])
    setShowModal(false)
  }

  const handleToggle = async (id: string, completed: boolean) => {
    await fetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed }),
    })
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed } : t)))
  }

  const handleDelete = async (id: string) => {
    await fetch(`/api/tasks/${id}`, { method: 'DELETE' })
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const handleSync = async () => {
    setSyncing(true)
    const res = await fetch('/api/sync/moodle', { method: 'POST' })
    if (res.ok) {
      setLastSynced(new Date())
      const updated = await fetch('/api/tasks').then((r) => r.json())
      setTasks(updated)
    }
    setSyncing(false)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-xl mx-auto py-10 px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
            <h1 className="text-xl font-semibold">My Tasks</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setShowModal(true)}
                className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                + Add
              </button>
              <Link
                href="/settings"
                className="px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-100 rounded-lg"
              >
                ⚙
              </Link>
            </div>
          </div>
          <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
          <SyncStatus lastSynced={lastSynced} onSync={handleSync} syncing={syncing} />
        </div>
      </div>
      {showModal && (
        <AddTaskModal onAdd={handleAdd} onClose={() => setShowModal(false)} />
      )}
    </main>
  )
}
