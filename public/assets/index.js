console.log("script is linked");

const prodName = document.querySelector("#productName");
const desc = document.querySelector("#desc");
const submit = document.querySelector("#submit");
const all = document.querySelector("#all");

const addDb = async (e) => {
  e.preventDefault();
  const name = prodName.value.trim();
  const description = desc.value.trim();
  const res = await fetch("/api/products", {
    method: "POST",
    body: JSON.stringify({ name, description }),
    headers: { "Content-Type": "application/json" },
  });
  if (res.ok) {
  } else {
    alert("Error Adding product to Database");
  }
};

const getAll = async (e) => {
  e.preventDefault();
  const getAll = await fetch("api/products", {
    method: "GET",
  });
  const json = getAll.json();
  console.log(json);
};

all.addEventListener("click", getAll);
submit.addEventListener("click", addDb);
