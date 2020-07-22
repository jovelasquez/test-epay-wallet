module.exports = {
  soapServer: process.env.SOAP_SERVER
    ? process.env.SOAP_SERVER
    : "http://localhost:8000",
};
