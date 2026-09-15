'use client'

import { Task } from '@/lib/types'

interface Props {
  task: Task
  onToggle: (id: string, completed: boolean) => void
  onDelete: (id: string) => void
}

export default function TaskRow({ task, onToggle, onDelete }: Props) {
  const formattedDate = task.due_date
    ? new Date(task.due_date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    : null

  return (
    <div className="flex items-center gap-3 py-3 px-4 border-b border-gray-100 hover:bg-gray-50">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={(e) => onToggle(task.id, e.target.checked)}
        className="w-4 h-4 cursor-pointer"
      />
      <span
        className={`flex-1 text-sm ${
          task.completed ? 'line-through text-gray-400' : ''
        }`}
      >
        {task.title}
      </span>
      {task.source === 'moodle' && (
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
          Moodle
        </span>
      )}
      {formattedDate && (
        <span className="text-xs text-gray-500">{formattedDate}</span>
      )}
      <button
        aria-label="delete"
        onClick={() => onDelete(task.id)}
        className="text-gray-300 hover:text-red-500 text-sm"
      >
        ✕
      </button>
    </div>
  )
}
