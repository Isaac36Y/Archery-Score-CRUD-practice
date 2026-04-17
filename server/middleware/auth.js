import { supabase } from '../app.js'

export const requireAuth = async (req, res, next) => {
    const token = req.cookies.access_token
    console.log(token)
    if (!token) return res.redirect('/login')

    const { data, error } = await supabase.auth.getUser(token)
    if (error || !data.user) return res.redirect('/login')

    next()
}
