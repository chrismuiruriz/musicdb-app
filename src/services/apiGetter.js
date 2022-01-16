export default async function apiGetter(endpoint) {
  const apiUrl = `http://localhost:8080/https://api.deezer.com/${endpoint}`;
  const res = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await res.json();
  return json;
}
