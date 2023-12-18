export const isNullOrUndefined = (value: any) => {
  return value === null || value === undefined;
}

export const isNotNullOrUndefined = (value: any) => {
  return value !== null && value !== undefined;
}
