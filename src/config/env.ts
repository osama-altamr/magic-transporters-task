import { Env } from '@app/utils/enums'

export const getEnvironmentValue = (key: string, defaultValue?: string): string => {
  const value = process.env[key] ?? defaultValue

  if (!value) {
    throw new Error(`Env variable "${key}" has to be defined`)
  }

  return value
}

export const getNumericEnvironmentValue = (name: string, defaultValue?: number): number => {
  const value = Number(getEnvironmentValue(name, defaultValue?.toString()))

  if (isNaN(value)) {
    throw new Error(`Env variable "${name}" has to be a number`)
  }

  return value
}

const currentEnv = getEnvironmentValue('NODE_ENV', Env.local)

const isKnownEnvironment = (value: string): value is Env => Object.values<string>(Env).includes(value)

if (!isKnownEnvironment(currentEnv)) {
  throw new Error(`Unknown environment: ${currentEnv}`)
}

export const env = currentEnv
