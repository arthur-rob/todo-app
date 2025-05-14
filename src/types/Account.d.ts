export interface Account {
    id: number
    firstName: string
    lastName: string
    email: string
    password: string
}

export type AccountCreate = Omit<Account, 'id'>
