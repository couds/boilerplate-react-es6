"use strict";

import express from 'express'
import ReactEngine from 'express-react-views'
import { join } from 'path'

const app = express()

app.set('views', join(__dirname, 'src/views'))
app.set('view engine', '.jsx');
app.engine('jsx', ReactEngine.createEngine());
app.use(express.static(join(__dirname, 'public')));


app.get('/', (req, res) => res.render('index'));

export default app;