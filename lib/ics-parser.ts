import ical from 'node-ical'

interface ParsedTask {
  title: string
  due_date: string | null
  moodle_uid: string
}

export function parseICSFeed(icsText: string): ParsedTask[] {
  const events = ical.parseICS(icsText)
  const tasks: ParsedTask[] = []

  for (const event of Object.values(events)) {
    if (event.type !== 'VEVENT') continue
    tasks.push({
      title: event.summary ?? 'Untitled',
      due_date: event.start ? new Date(event.start).toISOString() : null,
      moodle_uid: event.uid ?? '',
    })
  }

  // Sort by moodle_uid for consistent ordering (parseICS uses UID as object key)
  tasks.sort((a, b) => a.moodle_uid.localeCompare(b.moodle_uid))

  return tasks
}
