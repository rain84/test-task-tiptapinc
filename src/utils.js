const createErrorMessage = (err) =>
  Object.entries(err)
    ?.map(([type, errorMessage]) =>
      errorMessage ? `${type}: ${errorMessage}` : ''
    )
    .join('\n')

export const utils = {
  createErrorMessage,
}
