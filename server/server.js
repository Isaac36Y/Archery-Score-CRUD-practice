import app from './app.js'
import './routes/scores.js';
import './routes/auth.js'

app.listen(3000, () => {
    console.log('server running on port 3000')
})

app.use((req, res) => {
    res.status(404).render('404', { title: '404'})
})