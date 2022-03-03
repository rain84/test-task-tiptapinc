const createErrorMessage = (err) =>
  Object.entries(err)
    ?.map(([type, errorMessage]) =>
      errorMessage ? `${type}: ${errorMessage}` : ''
    )
    .filter(Boolean)
    .join('\n')

export const utils = {
  createErrorMessage,
}
