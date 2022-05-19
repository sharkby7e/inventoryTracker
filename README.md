# inventoryTracker

## Description

This application is an inventory tracker for a logistics company. It features a simple interface, backed by an SQLite database. 
Users can view all products in the inventory, add items, update stock, as well as choose a warehouse for each product.
Users can also create new warehouses which will be available to add inventory to.

Even though the application is simple, it is made to easily expand. The models and relationships can easily be adjusted to fit 
the needs of the user. 

## Use application

[Click to try out the web application on Replit](https://replit.com/@sgquin/inventoryTracker#.replit)

## Table of contents

- [Technologies Employed](#technologies-employed)
- [Key Functions](#key-functions)
- [Usage](#usage)
- [License](#license)
- [Contact/Questions](#questions)

## Technologies Employed

| Techlogy             | Implementation/Use       |
| -------------------- | ------------------------ |
| Node.js              | JavaScript runtime       |
| Node Package Manager | Manage node packages     |
| Express.js           | Web framework            |
| sequelize            | ORM                      |
| SQlite3              | Database                 |


## Key Functionality

### Product Model 

This was the model for a Product. It features a name, description, stock, and a warehouse_id, to associate 
each product with a certain warehouse.This model can be expanded to indclude a 
shipment id to include this product to a shipment. 

```javascript
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    warehouse_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "warehouse",
        key: "id",
      }
    }
  }
```
### Product Routes

These are a few of the routes associated with products that are all available to take requests from the front-end.
User can create new products, get all of them, or delete by id.  

```javascript
router.post("/", async (req, res) => {
  await Product.create(req.body);
  res.send("success");
});

router.get("/", async (req, res) => {
  const allProd = await Product.findAll({
    include: [
      {
        model: Warehouse,
        attributes: ["location"],
      },
    ],
  });
  res.json(allProd);
});

router.delete("/:id", async (req, res) => {
  const delProd = await Product.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.json("Item successfuly destroyed");
});
```
### Warehouse Model 

A simple model for a warehouse, with just an id and location. If I were to expand this web application, 
I would would allow users to view all products by warehouse. 

```javascript
Warehouse.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }
```

## Usage
In order to run this application, simply visit the [link](https://replit.com/@sgquin/inventoryTracker#.replit)
, and hit the Run button at the top of the page. The web app will run on replit, 
where you can use all of the features.

## License
This application is released under the Gnu General Public License.

[[License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## Questions?

Please contact me at:

sgquin@gmail.com

Alternatively, visit my github:

https://www.github.com/sharkby7e

