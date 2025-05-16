export interface Task {
    title: string
    descriptionShort: string
    descriptionLong?: string
    isCompleted: boolean
    expireAt?: Date
    id?: number
    createdAt?: Date
}
