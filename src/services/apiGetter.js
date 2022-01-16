export default async function apiGetter(endpoint) {
  const proxyurl =
    process.env.REACT_APP_SECRET_PROXY_URL || "http://localhost:8080/";
  const deezerApiUrl =
    process.env.REACT_APP_SECRET_DEEZER_API_URL || "https://api.deezer.com/";

  const apiUrl = `${proxyurl}${deezerApiUrl}${endpoint}`;
  const res = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await res.json();
  return json;
}
