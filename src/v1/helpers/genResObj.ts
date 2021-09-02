import ResponseType from "../types/ResponseType"

export default function genResObj(error: string | null, data: any) {
  let resObj: ResponseType
  if (error !== null) {
    return (resObj = {
      success: false,
      error,
    })
  }

  return (resObj = {
    success: true,
    error,
    data,
  })
}
