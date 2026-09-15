import { render, screen, fireEvent } from '@testing-library/react'
import TaskRow from '@/components/TaskRow'
import { Task } from '@/lib/types'

const baseTask: Task = {
  id: '1',
  title: 'Test task',
  due_date: '2026-10-01T00:00:00.000Z',
  completed: false,
  source: 'manual',
  moodle_uid: null,
  created_at: '2026-09-15T00:00:00.000Z',
}

describe('TaskRow', () => {
  it('renders the task title', () => {
    render(<TaskRow task={baseTask} onToggle={jest.fn()} onDelete={jest.fn()} />)
    expect(screen.getByText('Test task')).toBeInTheDocument()
  })

  it('calls onToggle with id and new completed value when checkbox clicked', () => {
    const onToggle = jest.fn()
    render(<TaskRow task={baseTask} onToggle={onToggle} onDelete={jest.fn()} />)
    fireEvent.click(screen.getByRole('checkbox'))
    expect(onToggle).toHaveBeenCalledWith('1', true)
  })

  it('calls onDelete with id when delete button clicked', () => {
    const onDelete = jest.fn()
    render(<TaskRow task={baseTask} onToggle={jest.fn()} onDelete={onDelete} />)
    fireEvent.click(screen.getByRole('button', { name: /delete/i }))
    expect(onDelete).toHaveBeenCalledWith('1')
  })

  it('shows Moodle badge for moodle-sourced tasks', () => {
    const moodleTask: Task = { ...baseTask, source: 'moodle', moodle_uid: 'uid@moodle' }
    render(<TaskRow task={moodleTask} onToggle={jest.fn()} onDelete={jest.fn()} />)
    expect(screen.getByText('Moodle')).toBeInTheDocument()
  })
})
