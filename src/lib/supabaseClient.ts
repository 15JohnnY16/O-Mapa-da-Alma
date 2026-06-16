import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://aacylcifqfadayidfcio.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhY3lsY2lmcWZhZGF5aWRmY2lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1NTEzNTksImV4cCI6MjA5MDEyNzM1OX0.nDy6qw5GPu7Sg-pgeLsUlMesLfDX1BvmkwFjIvLFZvs'
)
