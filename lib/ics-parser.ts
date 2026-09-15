import ical, { VEvent } from 'node-ical'

interface ParsedTask {
  title: string
  due_date: string | null
  moodle_uid: string
}

function isVEvent(e: unknown): e is VEvent {
  return typeof e === 'object' && e !== null && (e as VEvent).type === 'VEVENT'
}

export function parseICSFeed(icsText: string): ParsedTask[] {
  const events = ical.parseICS(icsText)

  const tasks: ParsedTask[] = Object.values(events)
    .filter(isVEvent)
    .map((e) => ({
      title: e.summary ?? 'Untitled',
      due_date: e.start ? new Date(e.start).toISOString() : null,
      moodle_uid: e.uid ?? '',
    }))

  tasks.sort((a, b) => a.moodle_uid.localeCompare(b.moodle_uid))

  return tasks
}
