import { supabase } from '../app.js'

export const requireAuth = async (req, res, next) => {
    const { data, error } = await supabase.auth.getSession()
    if (!data.session) {
        return res.redirect('/login')
    }
    next()
}
