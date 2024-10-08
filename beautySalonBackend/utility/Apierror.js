class Apierror extends Error {
  constructor(message,statusCode ){
    super(message)
    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4')?'fails':'error'
    this.isOperational=  true
    Error.captureStackTrace(this,this.constructor);
  }
}

export default Apierror