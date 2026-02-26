import { Types } from 'mongoose'
import { custom } from 'zod'

/** Zod schema for MongoDB ObjectId: validates with Types.ObjectId.isValid, outputs string. */
export const objectId = custom((data: unknown) => Types.ObjectId.isValid(data as string)).transform(String)

