import express, { urlencoded } from 'express'
import morgan from 'morgan'
import multer from 'multer'

const PORT = 3000

const app = express()


const logFormat = `
time    :date[web]
method  :method 
type    :req[content-type] 
url     :url 
status  :status 
--------------------------------------------------`

app.use(
    // express.urlencoded({extended: false}),
    express.json(),
    morgan(logFormat),
    express.static('public/'),
    // multer().none(),
)

app.post('/celsius', (req, res) => {
    res.send(celsius(req.body));
})

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))


function celsius(f) {
    const c = (5 / 9) * (f.F - 32);
    return {"C": c };
}