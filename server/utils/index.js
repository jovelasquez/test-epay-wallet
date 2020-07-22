const { soapServer } = require("../config");

module.exports.getWSDL = (service) => {
  return `${soapServer}/webservices/${service}/soap?WSDL`;
};

module.exports.parseResponse = (res, result) => {
  const code = result.return.item[0].value.$value;

  let response = {
    [result.return.item[0].key.$value]: result.return.item[0].value.$value,
    [result.return.item[1].key.$value]: result.return.item[1].value.$value,
    [result.return.item[2].key.$value]: [],
  };

  if (result.return.item[2].value.hasOwnProperty("item")) {
    const payload = result.return.item[2].value.item;
    if (code >= 200 && code <= 299) {
      let results = {};
      Object.values(payload).forEach((item) => {
        if (item.hasOwnProperty("key") && item.hasOwnProperty("value")) {
          results[`${item.key.$value}`] = item.value.$value;
        }
      });
      response["payload"] = results;
      console.log(response["payload"]);
    } else {
      response["errors"] = payload.map((item) => ({
        [item.key.$value]: item.value.item.$value,
      }));
    }
  }

  res.status(code).json(response);
};
