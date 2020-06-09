function errorHandler(err, req, res, next){
  let statusCode = '';
  let errorMassage = '';
  let errorCode = '';

  switch (err.name) {
    case 'TOKEN_NOT_FOUND':
      statusCode = 404;
      errorCode = err.name;
      errorMassage = 'Token not found, please insert token';      
      break;
    case 'INVALID_TOKEN':
      statusCode = 404;
      errorCode = err.name;
      errorMassage = 'Invalid Token / invalid username, please input correct Token';      
      break;
    case 'USER_NOT_FOUND':
      statusCode = 404;
      errorCode = err.name;
      errorMassage =  err.message || 'Username Not Found / not registered';      
      break;
    case 'TODO_NOT_FOUND':
      statusCode = 404;
      errorCode = err.name;
      errorMassage = 'Todo Not Found';      
      break;
    case 'NOT_AUTHORIZED':
      statusCode = 403;
      errorCode = err.name;
      errorMassage = `You're not authorized to do this`;      
      break;
    case 'SequelizeValidationError':
      statusCode = 403;
      errorCode = "VALIDATION_ERROR";
      errorMassage = [];
      err.errors.forEach(element => {
        errorMassage.push(element.message)
      });      
      break;
    case 'SequelizeUniqueConstraintError':
      statusCode = 403;
      errorCode = "CONSTRAINT_DB_ERROR";
      errorMassage = [];
      err.errors.forEach(element => {
        errorMassage.push(element.message)
      });      
      break;
    default:
      statusCode = 500;
      errorCode = 'INTERNAL_ERROR_SERVER';
      errorMassage = 'Internal Error Server'; 
      break;
  }

  res.status(statusCode).json({
    errorCode:errorCode,
    message:errorMassage
  })
}

module.exports = errorHandler;