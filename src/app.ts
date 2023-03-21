import express from 'express'
import cors from 'cors'

class App {
  public app: express.Application

  constructor() {
    this.app = express()
    this.config()
    this.routes()
  }

  private config(): void {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cors())
  }

  private routes(): void {
    const router = express.Router()

    router.get('/', (req, res) => {
      res.send('Baby Care API')
    })

    this.app.use('/', router)
  }
}

export default new App().app
