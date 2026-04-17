import app from '../app.js'
import { supabase } from '../app.js'

app.get('/login', (req, res) => {
    console.log(req.cookies)
    res.render('login', { title: "Login"})
})

app.post('/login', async (req, res) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: req.body.email,
        password: req.body.password
    })
    if (error || !data.session) {
        return res.redirect('/login')
    }
    
    res.cookie('access_token', data.session.access_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000
    })
    res.redirect('/')
})

app.get('/signup', (req, res) => {
    res.render('signup', { title: "SignUp"})
})

app.post('/signup', async (req, res) => {
    const { data, error } = await supabase.auth.signUp({
        email: req.body.email,
        password: req.body.password,
        options: {
            data: {
                first_name: req.body.name
            }
        },
    })
    res.redirect('/')
})

app.post('/logout', async (req, res) => {
    await supabase.auth.signOut()
    res.clearCookie('access_token')
    res.redirect('/login')
})