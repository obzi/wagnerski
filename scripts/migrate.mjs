/**
 * Supabase data migration script
 *
 * Prerequisites:
 *   1. V SQL Editoru nového projektu spusť supabase/schema.sql
 *   2. Spusť: node scripts/migrate.mjs
 */

import { createClient } from '@supabase/supabase-js'

// ── SOURCE (starý projekt, public read = anon key stačí) ──────────────────────
const SOURCE_URL         = 'https://rajgrklcppvxnjmsszwf.supabase.co'
const SOURCE_ANON_KEY    = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhamdya2xjcHB2eG5qbXNzendmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MDc4MDgsImV4cCI6MjA5MTA4MzgwOH0.HGbrG1-EYWAExbNN-1fVjZydNYZIsFTapzd9BPQFnaU'

// ── TARGET (nový projekt, service role = bypass RLS) ──────────────────────────
const TARGET_URL         = 'https://ozckwnpwsvwgxrsbvfgq.supabase.co'
const TARGET_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im96Y2t3bnB3c3Z3Z3hyc2J2ZmdxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDMyNDA2MywiZXhwIjoyMDk1OTAwMDYzfQ.x51AsjdZlZpTY7PFEKW7LZm6oodafOmcOfoDhZQn1P0'

// ─────────────────────────────────────────────────────────────────────────────

// Tabulky s přirozeným unique klíčem jiným než id
const CONFLICT_COLUMN = {
  site_settings: 'key',
  vouchers: 'code',
}

const TABLES = [
  'contacts',
  'reservation_prices',
  'skicamp_terms',
  'instructor_courses',
  'camp_types',
  'course_types',
  'site_settings',
  'news',
  'vouchers',
]

async function migrateTable(src, tgt, table) {
  const { data, error } = await src.from(table).select('*')
  if (error) throw new Error(`[${table}] čtení selhalo: ${error.message}`)

  if (!data || data.length === 0) {
    console.log(`  – ${table}: prázdná, přeskočena`)
    return 0
  }

  const onConflict = CONFLICT_COLUMN[table] ?? 'id'

  const { error: writeError } = await tgt
    .from(table)
    .upsert(data, { onConflict })

  if (writeError) throw new Error(`[${table}] zápis selhal: ${writeError.message}`)

  return data.length
}

async function main() {
  const src = createClient(SOURCE_URL, SOURCE_ANON_KEY, { auth: { persistSession: false } })
  const tgt = createClient(TARGET_URL, TARGET_SERVICE_KEY, { auth: { persistSession: false } })

  console.log('\nSupabase migrace')
  console.log('  zdroj:', SOURCE_URL)
  console.log('  cíl:  ', TARGET_URL)
  console.log('')

  let total = 0

  for (const table of TABLES) {
    try {
      const count = await migrateTable(src, tgt, table)
      if (count > 0) console.log(`  ✓ ${table}: ${count} řádků`)
      total += count
    } catch (err) {
      console.error(`  ✗ ${err.message}`)
      process.exit(1)
    }
  }

  console.log(`\nHotovo — přeneseno ${total} řádků.\n`)
  console.log('─── Po migraci ───────────────────────────────────────────────')
  console.log('• .env.local je již aktualizovaný (nový Supabase + Resend)')
  console.log('• Až přidáš ověřenou doménu v Resend, uprav odesílatele')
  console.log('  v src/config/site.ts (EMAIL.voucher/instruktor/skicamp.from)')
  console.log('──────────────────────────────────────────────────────────────\n')
}

main()
