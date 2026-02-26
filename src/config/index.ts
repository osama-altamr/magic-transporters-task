import { Env } from "@app/utils/enums"

export { config } from './default'

export interface Config {
  env: Env
  appName: string
  server: {
    port: number
  }
  database: {
    mongo: {
      url: string
    }
  }
  swagger: {
    email: string
    password: string
  }
}
