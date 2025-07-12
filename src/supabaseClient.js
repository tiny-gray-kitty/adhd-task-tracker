import { createClient } from '@supabase/supabase-js'

// Get these from your Supabase dashboard
const supabaseUrl = 'https://jzlaxdetjobixyvuainv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6bGF4ZGV0am9iaXh5dnVhaW52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyODM3NjQsImV4cCI6MjA2Nzg1OTc2NH0.AfoCCFQCa_ZMzePilh6kYyvKQNLTqPAKZ2XRuR82DQQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
