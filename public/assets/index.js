console.log("script is linked");

const prodName = document.querySelector("#productName");
const desc = document.querySelector("#desc");
const submit = document.querySelector("#submit");
const all = document.querySelector("#all");
const list = document.querySelector("#list");

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
    alert(`${name} added to the database`);
    document.location.reload();
  } else {
    alert("Error Adding product to Database");
  }
};

const getAll = async (e) => {
  e.preventDefault();
  const getAll = await fetch("api/products", {
    method: "GET",
  });
  getAll.json().then((data) => display(data));
};

const display = (data) => {
  list.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    const { name, description, warehouse } = data[i];
    const newLi = document.createElement("li");
    newLi.textContent = `${name} - ${description} // Warehouse: ${warehouse.location}`;
    list.append(newLi);
  }
};

all.addEventListener("click", getAll);
submit.addEventListener("click", addDb);
