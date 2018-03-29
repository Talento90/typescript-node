export interface Task {
  id?: number
  name: string
  description: string
  done: boolean
  userId: number
  created: Date
  updated: Date
}
