import app from '../app.js'
import { supabase } from '../app.js'
import { requireAuth } from '../middleware/auth.js'

app.get('/', requireAuth, (req, res) => {
    console.log(req.cookies)
    res.render('index', { title: 'Home'})
})

app.get('/scores', requireAuth, async (req, res) => {
    if (req.query.order === 'score-desc') {
        const { data: scores, error } = await supabase.from('Score tracker').select('*').order('score', { ascending: false})
        res.render('scores', { scores, title: 'Scores ', order: req.query.order || 'default'})
    }else if (req.query.order === 'score-asc') {
        const { data: scores, error } = await supabase.from('Score tracker').select('*').order('score', { ascending: true})
        res.render('scores', { scores, title: 'Scores ', order: req.query.order || 'default'})
    }else if (req.query.order === 'date-desc') {
        const { data: scores, error } = await supabase.from('Score tracker').select('*').order('date', { ascending: false})
        res.render('scores', { scores, title: 'Scores ', order: req.query.order || 'default'})
    }else if (req.query.order === 'date-asc') {
        const { data: scores, error } = await supabase.from('Score tracker').select('*').order('date', { ascending: true})
        res.render('scores', { scores, title: 'Scores ', order: req.query.order || 'default'})
    }else {
        const { data: scores, error } = await supabase.from('Score tracker').select('*').order('id', { ascending: true })
        res.render('scores', { scores, title: 'Scores', order: req.query.order || 'default'})
    }
    
})

app.get('/score-input', requireAuth, (req, res) => {
    console.log(req.cookies)
    res.render('input', { title: 'Input' })

})

app.post('/scores', async (req, res) => {
    const { data, error } = await supabase.from('Score tracker').insert(req.body)

    res.redirect('/scores')
})


app.post('/scores/:id/delete', async (req, res) => {
    const id = parseInt(req.params.id)
    const { error } = await supabase.from('Score tracker').delete().eq('id', id)


    res.redirect('/scores')
})

app.post('/scores/:id/edit', async (req, res) => {
    const id = parseInt(req.params.id)
    const { error } = await supabase.from('Score tracker').update(req.body).eq('id', id)
   
    res.status(200).json({ message: 'success'})
})
