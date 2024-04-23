import { useEffect, useState } from "react";

const useFetch = (url, token) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function apiCall() {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      })
      const arrData = await response.json();
      setData(arrData.data);
    }
    // setInterval(() => {
      apiCall();
    // }, 1000)
  }, [url, token]);

  return data;
};

export default useFetch;
