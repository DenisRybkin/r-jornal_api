export const queryGetter = (response: any): string =>
  response.data.result.alternatives[0].message.text
