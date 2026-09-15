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
    if (!event || event.type !== 'VEVENT') continue
    const vevent = event as ical.VEvent
    tasks.push({
      title: vevent.summary ?? 'Untitled',
      due_date: vevent.start ? new Date(vevent.start).toISOString() : null,
      moodle_uid: vevent.uid ?? '',
    })
  }

  // Sort by moodle_uid for consistent ordering (parseICS uses UID as object key)
  tasks.sort((a, b) => a.moodle_uid.localeCompare(b.moodle_uid))

  return tasks
}
