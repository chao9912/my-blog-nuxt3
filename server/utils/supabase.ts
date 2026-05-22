import { createClient } from '@supabase/supabase-js'

// 服务端专用Supabase客户端（管理员权限，安全）
export const useServerSupabase = () => {
    const config = useRuntimeConfig()
    return createClient(
        config.public.supabaseUrl,
        config.supabaseServiceKey,
        { auth: { autoRefreshToken: false, persistSession: false } }
    )
}