const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')
const cors = require('cors')
const initDatabase = require('./startUp/initDatabase')
const routes = require('./routes/index')
const path = require('path')

const app = express()
const PORT = config.get('port') ?? 8080

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use('/api', routes)

if (process.env.NODE_ENV === 'production') {
	console.log('production')
	app.use('/', express.static(path.join(__dirname, 'client')))

	const indexpath = path.join(__dirname, 'index.html')
	app.get('*', (req, res) => {
		res.sendFile(indexpath)
	})
} else {
	console.log('development')
}

async function start() {
	try {
		mongoose.connection.once('open', () => { initDatabase()})
		await mongoose.connect(config.get('mongoUri'))
		console.log(chalk.bgMagenta.black(`Mongo DataBase connected...`))
		app.listen(PORT, () => {
			console.log(chalk.bgYellow.black(`Server has been started on port: ${PORT}...`))})
	} catch (error) {
		console.log(chalk.redBright(error.message))
		process.exit(1)
	}
}

start()

