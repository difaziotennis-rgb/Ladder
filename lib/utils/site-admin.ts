import { cookies } from 'next/headers'

/**
 * Check if user is authenticated as site admin
 */
export async function isSiteAdmin(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get('site_admin_session')?.value
    
    if (!sessionId) return false

    // Verify session exists in database
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()
    
    const { data } = await supabase
      .from('site_admin')
      .select('id')
      .eq('id', sessionId)
      .single()

    return !!data
  } catch (error) {
    return false
  }
}

