import type { Config } from '@app/config'
import { env, getEnvironmentValue, getNumericEnvironmentValue } from './env'

export const config: Config = {
  env: env,
  appName: getEnvironmentValue('APP_NAME', 'magic-transporters-task'),
  server: {
    port: getNumericEnvironmentValue('PORT', 3000),
  },
  database: {
    mongo: {
      url: getEnvironmentValue('MONGO_URL'),
    },
  },
  swagger: {
    email: getEnvironmentValue('SWAGGER_EMAIL', 'admin@example.com'),
    password: getEnvironmentValue('SWAGGER_PASSWORD', 'admin'),
  },
}