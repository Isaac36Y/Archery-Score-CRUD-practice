import 'dotenv/config';
import express from 'express'
import { createClient } from '@supabase/supabase-js'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const app = express()



app.set('view engine', 'ejs');
app.set('views', join(__dirname, '../client/views'));

app.use(express.json())
app.use(express.static(join(__dirname, '../client/public')));
app.use(express.urlencoded({ extended: true }))

export default app;
