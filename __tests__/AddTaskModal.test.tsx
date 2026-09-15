import { render, screen, fireEvent } from '@testing-library/react'
import AddTaskModal from '@/components/AddTaskModal'

describe('AddTaskModal', () => {
  it('renders the title input', () => {
    render(<AddTaskModal onAdd={jest.fn()} onClose={jest.fn()} />)
    expect(screen.getByPlaceholderText('Task title')).toBeInTheDocument()
  })

  it('calls onAdd with title and null due_date when no date entered', () => {
    const onAdd = jest.fn()
    render(<AddTaskModal onAdd={onAdd} onClose={jest.fn()} />)
    fireEvent.change(screen.getByPlaceholderText('Task title'), {
      target: { value: 'New task' },
    })
    fireEvent.click(screen.getByRole('button', { name: /add/i }))
    expect(onAdd).toHaveBeenCalledWith('New task', null)
  })

  it('calls onClose when cancel is clicked', () => {
    const onClose = jest.fn()
    render(<AddTaskModal onAdd={jest.fn()} onClose={onClose} />)
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }))
    expect(onClose).toHaveBeenCalled()
  })

  it('does not call onAdd when title is empty', () => {
    const onAdd = jest.fn()
    render(<AddTaskModal onAdd={onAdd} onClose={jest.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: /add/i }))
    expect(onAdd).not.toHaveBeenCalled()
  })
})
