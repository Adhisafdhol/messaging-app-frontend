const isAuthenticated = async () => {
  let isAuthenticated = false;

  try {
    const res = await fetch(`http://localhost:3000/login`, {
      credentials: "include",
    });
    const data = await res.json();
    if (data.error) {
      console.log("You are not authenticated");
      isAuthenticated = false;
    } else {
      console.log("You are authenticated");
      isAuthenticated = true;
    }
  } catch (err) {
    throw new Error("Server Error");
  }

  return isAuthenticated;
};

export { isAuthenticated };
