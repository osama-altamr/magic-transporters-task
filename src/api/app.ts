/** Express app: /api (v1 routes), /api-docs (Swagger), JSON body parsing, error handler. */
import express from 'express'
import swaggerUi from 'swagger-ui-express'
import apiRoutes from './routes'
import { errorHandler } from './middlewares/error-handler'
import { swaggerDocument } from './swagger'

const app = express()

app.use(express.json())
app.use('/api', apiRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(errorHandler)

export default app
