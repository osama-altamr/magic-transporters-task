import 'dotenv/config'
import { startServer } from '@app/server'

startServer().catch(console.error)
