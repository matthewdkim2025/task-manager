'use client'

import { useState } from 'react'
import { Task } from '@/lib/types'
import TaskRow from './TaskRow'

type Filter = 'all' | 'upcoming' | 'completed'

interface Props {
  tasks: Task[]
  onToggle: (id: string, completed: boolean) => void
  onDelete: (id: string) => void
}

export default function TaskList({ tasks, onToggle, onDelete }: Props) {
  const [filter, setFilter] = useState<Filter>('all')

  const filtered = tasks.filter((t) => {
    if (filter === 'upcoming') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  const tabs: Filter[] = ['all', 'upcoming', 'completed']

  return (
    <div>
      <div className="flex gap-1 px-4 py-2 border-b border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1 text-sm rounded capitalize ${
              filter === tab
                ? 'bg-blue-100 text-blue-700 font-medium'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div>
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">No tasks here.</p>
        ) : (
          filtered.map((task) => (
            <TaskRow key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
          ))
        )}
      </div>
    </div>
  )
}
