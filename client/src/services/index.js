const { REACT_APP_API_URL } = process.env;

const CreateUser = (data) =>
  fetch(`${REACT_APP_API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

const GetBalanceWallet = (data, params) => {
  const esc = encodeURIComponent;
  const param = Object.keys(data)
    .map((key) => esc(key) + "=" + esc(data[key]))
    .join("&");

  return fetch(`${REACT_APP_API_URL}/wallets/balance?${param}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    ...params,
  });
};

const RechageWallet = (data, params) =>
  fetch(`${REACT_APP_API_URL}/wallets/recharge`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    ...params,
  });

const CreatePayment = (data, params) =>
  fetch(`${REACT_APP_API_URL}/wallets/payment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    ...params,
  });

const PaymentConfirm = (data, params) => {
  const esc = encodeURIComponent;
  const param = Object.keys(data)
    .map((key) => esc(key) + "=" + esc(data[key]))
    .join("&");

  return fetch(`${REACT_APP_API_URL}/wallets/payment?${param}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    ...params,
  });
};

export { CreateUser, GetBalanceWallet, RechageWallet, CreatePayment, PaymentConfirm };
