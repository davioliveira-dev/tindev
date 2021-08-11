type FunctionReturn = [
  data: any | null,
  error: Error | null
]

export default async function to(
    promise: Promise<any>,
): Promise<FunctionReturn> {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error];
  }
}
