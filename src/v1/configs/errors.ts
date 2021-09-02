const errorMsg = {
  unauthorized: {
    code: 403,
    msg: "Authorization is required!",
  },
  serverError: {
    code: 500,
    msg: "Server error!",
  },
  invalidUser: {
    code: 403,
    msg: "Invalid username or password!",
  },
  userAlreadyExist: {
    code: 409,
    msg: "Username already existed!",
  },
  notFound: {
    code: 404,
    msg: "Not found!",
  },
  badRequest: {
    code: 400,
    msg: "Bad Request!",
  },
  invalidToken: {
    code: 401,
    msg: "Invalid token!",
  },
  tokenExpired: {
    code: 401,
    msg: "Token expired!",
  },
  matchRunningError: {
    code: 400,
    msg: "Match is running cannot stop!",
  },
}

export default errorMsg
