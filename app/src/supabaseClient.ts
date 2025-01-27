import { createClient } from '@supabase/supabase-js'

// Substitua pelos valores da sua URL e chave anônima do Supabase
const supabaseUrl = 'https://gphtgbuxmwijwchzyjno.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwaHRnYnV4bXdpandjaHp5am5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2NDg4OTksImV4cCI6MjA0NTIyNDg5OX0.MnWkUgqIEScxFFydBpO6OXscuBFaJBoIKdLv6yoecrs'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase
