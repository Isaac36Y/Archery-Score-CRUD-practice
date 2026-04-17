import app from '../app.js'
import { supabase } from '../app.js'
import { getUserSupaBase, requireAuth } from '../middleware/auth.js'

app.get('/', requireAuth, (req, res) => {
    res.render('index', { title: 'Home'})
})

app.get('/scores', requireAuth, async (req, res) => {
    const userSupabase = getUserSupaBase(req.cookies.access_token)
    if (req.query.order === 'score-desc') {
        const { data: scores, error } = await userSupabase.from('Score tracker').select('*').order('score', { ascending: false})
        console.log('scores:', scores)
        console.log('error:', error)
        res.render('scores', { scores, title: 'Scores ', order: req.query.order || 'default'})
    }else if (req.query.order === 'score-asc') {
        const { data: scores, error } = await userSupabase.from('Score tracker').select('*').order('score', { ascending: true})
        res.render('scores', { scores, title: 'Scores ', order: req.query.order || 'default'})
    }else if (req.query.order === 'date-desc') {
        const { data: scores, error } = await userSupabase.from('Score tracker').select('*').order('date', { ascending: false})
        res.render('scores', { scores, title: 'Scores ', order: req.query.order || 'default'})
    }else if (req.query.order === 'date-asc') {
        const { data: scores, error } = await userSupabase.from('Score tracker').select('*').order('date', { ascending: true})
        res.render('scores', { scores, title: 'Scores ', order: req.query.order || 'default'})
    }else {
        const { data: scores, error } = await userSupabase.from('Score tracker').select('*').order('id', { ascending: true })
        console.log('scores:', scores)
        console.log('error:', error)
        res.render('scores', { scores, title: 'Scores', order: req.query.order || 'default'})
    }
    
})

app.post('/scores/:id/delete', async (req, res) => {
    const id = parseInt(req.params.id)
    const userSupabase = getUserSupaBase(req.cookies.access_token)
    const { error } = await userSupabase.from('Score tracker').delete().eq('id', id)

    res.redirect('/scores')
})

app.post('/scores/:id/edit', async (req, res) => {
    const id = parseInt(req.params.id)
    const userSupabase = getUserSupaBase(req.cookies.access_token)
    const { error } = await userSupabase.from('Score tracker').update(req.body).eq('id', id)

    res.status(200).json({ message: 'success'})
})

// score input
app.get('/score-input', requireAuth, (req, res) => {
    res.render('input', { title: 'Input' })

})

app.post('/score-input', async (req, res) => {
    const token = req.cookies.access_token
    const { data: userData } = await supabase.auth.getUser(token)
    const userSupabase = getUserSupaBase(token)

    const { data, error } = await userSupabase.from('Score tracker').insert({ ...req.body, user_id: userData.user.id })

    res.redirect('/scores')
})



