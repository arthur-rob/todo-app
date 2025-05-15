export const isEmailValid = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
}

export const isPasswordLongEnough = (str: string) => {
    return str.trim().length >= 8
}

export const isStringValid = (str: string) => {
    return str.trim().length > 0
}
