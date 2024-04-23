const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", {
    month: "short",
    hour: "2-digit",
    minute: "numeric",
  });
  return `${day} ${month}`;
};

export default formatDate;
