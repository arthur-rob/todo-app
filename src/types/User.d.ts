export interface User {
    firstName: string
    lastName: string
    email: string
}

export interface BaseUser extends User {
    id: number
}

export interface UserCreateUser extends BaseUser {
    password: string
}
