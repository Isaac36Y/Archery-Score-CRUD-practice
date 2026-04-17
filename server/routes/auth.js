import app from '../app.js'
import { supabase } from '@supabase/supabase-js'

app.get('/login', (req, res) => {
    res.render('/login', { title: "Login"})
})

app.get('/signup', (req, res) => {
    res.render('/signup', { title: "SignUp"})
})