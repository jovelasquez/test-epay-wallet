const { REACT_APP_API_URL } = process.env;

const CreateUser = (data) =>
  fetch(`${REACT_APP_API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

const GetBalanceWallet = (data) => {
  const esc = encodeURIComponent;
  const params = Object.keys(data)
    .map((key) => esc(key) + "=" + esc(data[key]))
    .join("&");

  return fetch(`${REACT_APP_API_URL}/wallets/balance?${params}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
};

const RechageWallet = (data) =>
  fetch(`${REACT_APP_API_URL}/wallets/recharge`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

const CreatePayment = (data) =>
  fetch(`${REACT_APP_API_URL}/wallets/payment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

const PaymentConfirm = (params) =>
  fetch(`${REACT_APP_API_URL}/wallets/payment${params}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

export { CreateUser, GetBalanceWallet, RechageWallet, CreatePayment, PaymentConfirm };
