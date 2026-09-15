export type TaskSource = 'manual' | 'moodle'

export interface Task {
  id: string
  title: string
  due_date: string | null
  completed: boolean
  source: TaskSource
  moodle_uid: string | null
  created_at: string
}

export interface Settings {
  id: number
  moodle_ics_url: string | null
}
