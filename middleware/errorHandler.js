const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500 ;
  switch(statusCode){
    case constants.VALIDATION_ERR: 
      res.json({
        title: "Validation Failed", 
        message : err.message, 
        StackTrace : err.stack
      });
      break;

    case constants.NOT_FOUND: 
      res.json({
        title: "Not Found!", 
        message : err.message, 
        StackTrace : err.stack
      });
      break;

    case constants.FORBIDDEN: 
      res.json({
        title: "Forbidden", 
        message : err.message, 
        StackTrace : err.stack
      });
      break;

    case constants.UNATHORIZED: 
      res.json({
        title: "Unathorized", 
        message : err.message, 
        StackTrace : err.stack
      });
      break;

    case constants.SERVER_ERR: 
      res.json({
        title: "Server error", 
        message : err.message, 
        StackTrace : err.stack
      });
      break;

    default: 
      console.log("No error, All good!");
      console.log(err);
      break;
  }
}

module.exports = errorHandler;