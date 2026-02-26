import { readFileSync } from 'fs'
import { join } from 'path'
import { parse } from 'yaml'

const swaggerPath = join(process.cwd(), 'swagger.yaml')

export const swaggerDocument = parse(readFileSync(swaggerPath, 'utf-8'))
