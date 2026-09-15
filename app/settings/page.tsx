'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function SettingsPage() {
  const [url, setUrl] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then((s) => setUrl(s.moodle_ics_url ?? ''))
  }, [])

  const handleSave = async () => {
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ moodle_ics_url: url }),
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-xl mx-auto py-10 px-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/" className="text-gray-400 hover:text-gray-600 text-sm">
              ← Back
            </Link>
            <h1 className="text-xl font-semibold">Settings</h1>
          </div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Moodle Calendar Feed URL (.ics)
          </label>
          <p className="text-xs text-gray-400 mb-2">
            In Moodle: Calendar → Export Calendar → copy the URL
          </p>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://your-moodle.edu/calendar/export.php?..."
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-4"
          />
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {saved ? 'Saved!' : 'Save'}
          </button>
        </div>
      </div>
    </main>
  )
}
