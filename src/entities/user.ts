export interface User {
  id?: number
  email: string
  password: string
  salt: string
  role: string
  firstName: string
  lastName: string
  created: Date
  updated: Date
}
