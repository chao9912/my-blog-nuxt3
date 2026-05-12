export const success = (
    data: any = null,
    message = 'success'
) => {
    return {
        code: 200,
        message,
        data
    }
}

export const error = (
    message = 'error',
    code = 500
) => {
    return {
        code,
        message,
        data: null
    }
}