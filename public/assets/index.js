console.log("script is linked");

const prodName = document.querySelector("#productName");
const desc = document.querySelector("#desc");
const submit = document.querySelector("#submit");
const all = document.querySelector("#all");
const list = document.querySelector("#list");
const warehouses = document.querySelector("#warehouses");
const stockStr = document.querySelector("#stock");

const addDb = async (e) => {
  e.preventDefault();
  const name = prodName.value.trim();
  const description = desc.value.trim();
  const warehouse_id =
    warehouses.options[warehouses.selectedIndex].getAttribute("w-id");
  const stock = parseInt(stockStr.value.trim());
  if (name && description && warehouse_id && stock) {
    console.log(name, description, stock, warehouse_id);
    const res = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify({ name, stock, description, warehouse_id }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      alert(`${name} added to the database`);
      document.location.reload();
    } else {
      alert("Error Adding product to Database, please try again!");
    }
  } else {
    alert("Please Ensure form is filled out, and warehouse is selected");
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
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    const { id, stock, name, description, warehouse } = data[i];
    const newLi = document.createElement("li");
    newLi.textContent = `${name} - ${description} ///
      Warehouse: ${warehouse.location} ///   
      Current Stock: ${stock}   `;

    const newDl = document.createElement("button");
    newDl.setAttribute("del-id", `${id}`);
    newDl.textContent = "Delete";
    newLi.append(newDl);

    const newUp = document.createElement("button");
    newUp.setAttribute("up-id", `${id}`);
    newUp.textContent = "Update";
    newLi.append(newUp);

    list.append(newLi);
  }
};

const upDel = (e) => {
  e.preventDefault();
  if (e.target.hasAttribute("del-id")) {
    const id = e.target.getAttribute("del-id");
    deleteFetch(id);
  }
  if (e.target.hasAttribute("up-id")) {
    const id = e.target.getAttribute("up-id");
    updateFetch(id);
  }
};

// const updateFetch = async (id) => {
//   const res = await fetch("/api/products", {
//     method: "PUT",
//     body: JSON.stringify({ name, description }),
//     headers: { "Content-Type": "application/json" },
//   });
//   if (res.ok) {
//     alert(`${name} added to the database`);
//     document.location.reload();
//   } else {
//     alert("Error Adding product to Database");
//   }
// }

const deleteFetch = async (id) => {
  const res = await fetch(`/api/products/${id}`, {
    method: "DELETE",
  });
  if (res.ok) {
    alert(`Item deleted from the database`);
    document.location.reload();
  } else {
    alert("Error deleting product from Database");
  }
};

const getWarehouses = async () => {
  const res = await fetch(`api/warehouses`, {
    method: "GET",
  });
  res.json().then((data) => populateDropdown(data));
};

const populateDropdown = (arr) => {
  for (var i = 0; i < arr.length; i++) {
    const { location, id } = arr[i];
    const newWare = document.createElement("option");
    newWare.setAttribute("w-id", `${id}`);
    newWare.textContent = `${location}`;
    warehouses.append(newWare);
  }
};

getWarehouses();

all.addEventListener("click", getAll);
submit.addEventListener("click", addDb);
list.addEventListener("click", upDel);
