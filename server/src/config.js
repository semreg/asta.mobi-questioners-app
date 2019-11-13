import { config } from 'dotenv'

config()

export const jwksUri = process.env.JWKS_URI || ''
export const audience = process.env.AUDIENCE || ''
export const issuer = process.env.ISSUER || ''
export const mongoURI = process.env.MONGO_URI || 'mongodb://demo:demo1234@localhost:27017/questioners'
