import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .eq('id', 1)
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const body = await req.json()
  if (!('moodle_ics_url' in body)) {
    return NextResponse.json({ error: 'moodle_ics_url required' }, { status: 400 })
  }
  const { moodle_ics_url } = body

  const { data, error } = await supabase
    .from('settings')
    .update({ moodle_ics_url })
    .eq('id', 1)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
