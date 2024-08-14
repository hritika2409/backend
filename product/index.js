import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * products.length);
  res.json(products[randomIndex]);
});

app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const foundProduct = products.find((product) => product.id === id);
  res.json(foundProduct);
});

app.post("/products", (req, res) => {
  const newProduct = {
    id: products.length + 1,
    productName: req.body.name,
    productType: req.body.type,
  };
  products.push(newProduct);
  console.log(products.slice(-1));
  res.json(newProduct);
});

app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});

var products = [
  {
    id: 1,
    productName: "Wireless Mouse",
    productType: "Electronics",
  },
  {
    id: 2,
    productName: "Organic Green Tea",
    productType: "Beverages",
  },
  {
    id: 3,
    productName: "Yoga Mat",
    productType: "Fitness",
  },
  {
    id: 4,
    productName: "Bluetooth Speaker",
    productType: "Electronics",
  },
  {
    id: 5,
    productName: "Leather Wallet",
    productType: "Accessories",
  },
  {
    id: 6,
    productName: "LED Desk Lamp",
    productType: "Home & Living",
  },
  {
    id: 7,
    productName: "Portable Charger",
    productType: "Electronics",
  },
  {
    id: 8,
    productName: "Coffee Maker",
    productType: "Kitchen Appliances",
  },
  {
    id: 9,
    productName: "Bluetooth Headphones",
    productType: "Electronics",
  },
  {
    id: 10,
    productName: "Stainless Steel Water Bottle",
    productType: "Outdoor",
  },
  {
    id: 11,
    productName: "Backpack",
    productType: "Accessories",
  },
  {
    id: 12,
    productName: "Fitness Tracker",
    productType: "Fitness",
  },
  {
    id: 13,
    productName: "Electric Kettle",
    productType: "Kitchen Appliances",
  },
  {
    id: 14,
    productName: "Smartwatch",
    productType: "Electronics",
  },
  {
    id: 15,
    productName: "Air Conditioner",
    productType: "Home & Living",
  },
];
