'use client'

import { useState } from 'react'

interface Props {
  onAdd: (title: string, due_date: string | null) => void
  onClose: () => void
}

export default function AddTaskModal({ onAdd, onClose }: Props) {
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = () => {
    if (!title.trim()) return
    onAdd(title.trim(), dueDate ? new Date(dueDate).toISOString() : null)
    setTitle('')
    setDueDate('')
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <h2 className="text-lg font-semibold mb-4">Add Task</h2>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-3"
          autoFocus
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-4"
        />
        <div className="flex gap-2 justify-end">
          <button
            aria-label="cancel"
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
          >
            Cancel
          </button>
          <button
            aria-label="add"
            onClick={handleSubmit}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
