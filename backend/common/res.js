const STATUS = require("../config/Constants");
const RES = {
  errorRes: (res, err, code, message = null) => {
    return res
      .status(code)
      .json({
        status: false,
        message: message == null ? err.message : message,
      });
  },

  dataRes: (res, data, code, message = null) => {
    return res
      .status(code)
      .json({
        status: true,
        message: message == null ? err.message : message,
        data,
      });
  },
  okRes: (res, data, message = null) =>
    res
      .status(STATUS.OK)
      .json({
        status: true,
        message: message == null ? err.message : message,
        data,
      }),

  forbidErr: (res, err, message = null) =>
    res
      .status(STATUS.FORBIDDEN)
      .json({
        status: true,
        message: message == null ? err.message : message,
        data,
      }),
  notFoundRes: (res, message = null) =>
    res
      .status(STATUS.NOT_FOUND)
      .json({
        status: true,
        message: message == null ? err.message : message,
        data,
      }),
  badReqRes: (res, err) =>
    res
      .status(STATUS.BAD_REQ)
      .json({
        status: true,
        message: message == null ? err.message : message,
        data,
      }),
  unAuthRes: (res, message = null) =>
    res
      .status(STATUS.UNAUTH)
      .json({
        status: true,
        message: message == null ? err.message : message,
        data,
      }),
};

module.exports = RES;
