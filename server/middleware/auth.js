import { supabase } from '../app.js'
import { createClient } from '@supabase/supabase-js'

export const requireAuth = async (req, res, next) => {
    const token = req.cookies.access_token

    if (!token) return res.redirect('/login')

    const { data, error } = await supabase.auth.getUser(token)
    if (error || !data.user) return res.redirect('/login')

    next()
}

export const getUserSupaBase = (token) => {
    return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, {
        global: {
            headers: { Authorization: `Bearer ${token}`}
        }
    })
}