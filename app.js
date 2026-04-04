require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js')


const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const app = express()



app.set('view engine', 'ejs')
app.listen(3000, () => {
    console.log('server running on port 3000')
})
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.render('index', { title: 'Home'})
})

app.get('/scores', async (req, res) => {
    const { data: scores, error } = await supabase.from('Score tracker').select('*').order('id', { ascending: true })
    
    res.render('scores', { scores, title: 'Scores' })
})

app.get('/score-input', (req, res) => {
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
app.use((req, res) => {
    res.status(404).render('404', { title: '404'})
})
