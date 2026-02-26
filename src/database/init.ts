import { connect, disconnect, type Mongoose } from 'mongoose'
import { config } from '@app/config'

/** Connects to MongoDB using config URL; throws on failure. */
export const initializeMongoDB = async (): Promise<Mongoose> => {
  try {
    const mongoose = await connect(config.database.mongo.url, {
      maxPoolSize: 50,
      minPoolSize: 10,
    })

    return mongoose
  } catch (error) {
    const errorMessage = `MongoDB connection failed with error: ${String(error)}`
    throw error instanceof Error ? error : new Error(errorMessage)
  }
}

export const disconnectMongoDB = async (): Promise<void> => {
  await disconnect()
}
