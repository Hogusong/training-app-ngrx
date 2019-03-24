export interface USER {
  userId: string,
  email: string,
}

export interface AUTHDATA {
  email: string,
  password: string   
}

export interface EXERCISE {
  id?: string,
  name: string,
  duration: number,
  calories: number,
  date?: string,
  state?: 'completed' | 'cancelled' | null
}
