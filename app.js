import express, { urlencoded } from 'express'
import morgan from 'morgan'
import multer from 'multer'

const PORT = 3000

const app = express()
app.set('view engine', 'ejs')


const logFormat = `
time    :date[web]
method  :method 
type    :req[content-type] 
url     :url 
status  :status 
--------------------------------------------------`

app.use(
    express.urlencoded({ extended: false }),
    express.json(),
    morgan(logFormat),
    express.static('public/'),
    // multer().none(),
)

app.post('/celsius', (req, res) => {

        if(req.body.from){
    
        const result = celsius(req.body.from)

        res.header('Content-Security-Policy', "default-src 'self'; img-src 'self' data:; media-src 'self' data:; report-uri /csp-violation/", "style-src 'https://fonts.googleapis.com/css2?family=Kode+Mono:wght@400..700&display=swap'" )
    res.render('celsius', {result})


        }

})

app.post('/csp-violation/',
    express.json({ type: ['application/json', 'application/csp-report'] }),
    (req, res) => {
        console.log(new Date().toLocaleTimeString())
        console.log(req.body)
        res.sendStatus(204)
    }
)

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))



function celsius(f) {

    try {
        if (Number(f)) {
            const c = (5 / 9) * (f - 32);

            return c;
        }

        throw new Error(`Input is not a Number!`)

    } catch (error) {
        return error
    }

}