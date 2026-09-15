/**
 * @jest-environment node
 */
import { parseICSFeed } from '@/lib/ics-parser'

const SAMPLE_ICS = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Moodle//Moodle//EN
BEGIN:VEVENT
UID:assign-123@moodle.example.com
SUMMARY:Lab Report Due
DTSTART:20261001T235900Z
DTEND:20261001T235900Z
END:VEVENT
BEGIN:VEVENT
UID:assign-456@moodle.example.com
SUMMARY:Read Chapter 5
DTSTART:20261010T235900Z
DTEND:20261010T235900Z
END:VEVENT
END:VCALENDAR`

describe('parseICSFeed', () => {
  it('returns one task per VEVENT', () => {
    const tasks = parseICSFeed(SAMPLE_ICS)
    expect(tasks).toHaveLength(2)
  })

  it('extracts title from SUMMARY', () => {
    const tasks = parseICSFeed(SAMPLE_ICS)
    expect(tasks[0].title).toBe('Lab Report Due')
  })

  it('extracts moodle_uid from UID', () => {
    const tasks = parseICSFeed(SAMPLE_ICS)
    expect(tasks[0].moodle_uid).toBe('assign-123@moodle.example.com')
  })

  it('extracts due_date from DTSTART as ISO string', () => {
    const tasks = parseICSFeed(SAMPLE_ICS)
    expect(tasks[0].due_date).toBe('2026-10-01T23:59:00.000Z')
  })

  it('returns empty array for feed with no events', () => {
    const empty = `BEGIN:VCALENDAR\nVERSION:2.0\nEND:VCALENDAR`
    expect(parseICSFeed(empty)).toEqual([])
  })
})
