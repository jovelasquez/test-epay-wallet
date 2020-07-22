const soap = require("soap");
const { getWSDL, parseResponse } = require("../utils/index");

module.exports.doRequestSoap = (service, { data, method, res }) => {
  const wsdl = getWSDL(service);

  soap.createClient(wsdl, function (err, client) {
    if (err) {
      throw new Error(`Error consultando el servicio ${wsdl}!`);
    }

    client[`${method}`](data, function (err, result) {
      if (err) {
        throw new Error(
          `Error el metodo ${service}.${method} no esta disponible!`
        );
      }

      return parseResponse(res, result);
    });
  });
};
