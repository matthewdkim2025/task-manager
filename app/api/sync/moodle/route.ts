import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { parseICSFeed } from '@/lib/ics-parser'

export async function POST(req: Request) {
  const authHeader = req.headers.get('authorization')
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: settings, error: settingsError } = await supabase
    .from('settings')
    .select('moodle_ics_url')
    .eq('id', 1)
    .single()

  if (settingsError || !settings?.moodle_ics_url) {
    return NextResponse.json({ error: 'No Moodle URL configured' }, { status: 400 })
  }

  const icsRes = await fetch(settings.moodle_ics_url)
  if (!icsRes.ok) {
    return NextResponse.json({ error: 'Failed to fetch Moodle feed' }, { status: 502 })
  }
  const icsText = await icsRes.text()

  const parsed = parseICSFeed(icsText)
  if (parsed.length === 0) {
    return NextResponse.json({ synced: 0 })
  }

  const { error: upsertError } = await supabase.from('tasks').upsert(
    parsed.map((t) => ({
      title: t.title,
      due_date: t.due_date,
      source: 'moodle',
      moodle_uid: t.moodle_uid,
    })),
    { onConflict: 'moodle_uid', ignoreDuplicates: false }
  )

  if (upsertError) {
    return NextResponse.json({ error: upsertError.message }, { status: 500 })
  }

  return NextResponse.json({ synced: parsed.length })
}
