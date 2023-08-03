const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
var bodyParser = require("body-parser");
const router = require("./makePayment");
const bcrypt = require("bcrypt");
require("dotenv").config();
app.use(cors());
app.use(bodyParser.json({ limit: "1000kb" }));
// app.use(express.json());

const PORT = process.env.PORT || 9000;

const db = mysql.createPool({
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
  waitForConnections: true,
});

app.get("/getAll_category_subcategory", (req, res) => {
  console.log("executing getAll_category_subcategory");
  const q =
    "SELECT `id_category`, `id_subCategory` FROM `category_subcategory` WHERE 1";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    } else {
      return res.status(200).json(data);
    }
  });
});

app.use("/makePayment", router);

app.post("/addProduct", (req, res) => {
  console.log("executing add Product");
  let { title, desc, img, img2, price, isNew, type, category, subCategory } =
    req.body;
  // console.log(isNew);
  if (isNew === "true") {
    isNew = 1;
  } else {
    isNew = 0;
  }
  const newPrice = parseInt(price);
  // const updatedIsNew = Boolean(isNew);
  const newCat = parseInt(category);
  const subCat = parseInt(subCategory);
  const q = `INSERT INTO \`product\`(\`title\`, \`desc\`, \`img\`, \`img2\`, \`price\`, \`isNew\`, \`type\`) VALUES ("${title}", "${desc}", "${img}", "${img2}", "${newPrice}", ${isNew}, "${type}")`;
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    } else {
      const d = data.insertId;
      const s = `INSERT INTO \`product_category\`(\`id_product\`, \`id_category\`) VALUES (${d},${newCat})`;
      db.query(s, (err, data) => {
        if (err) {
          console.log(err);
          return res.status(400).json(err);
        } else {
          const m = `INSERT INTO \`product_subcategory\`(\`id_product\`, \`id_subCategory\`) VALUES (${d},${subCat})`;
          db.query(m, (err, data) => {
            if (err) {
              console.log(err);
              return res.status(400).json(err);
            } else {
              return res.status(200).json("Successful");
            }
          });
        }
      });
      // return res.status(200).json("Successful");
      //const q = `INSERT INTO \`product\`(\`title\`, \`desc\`, \`img\`, \`img2\`, \`price\`, \`isNew\`, \`type\`) VALUES ("${title}", "${desc}", "${img}", "${img2}", "${newPrice}", "${updatedIsNew}", "${type}")`;
    }
  });
});

app.post("/addCategory", (req, res) => {
  console.log("executing post");
  const { title, desc, img } = req.body;
  const q = `INSERT INTO \`category\`(\`title\`, \`desc\`, \`img\`) VALUES ("${title}", "${desc}", "${img}")`;
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    } else {
      return res.status(200).json("Successful");
    }
  });
});

app.get("/categories", (req, res) => {
  console.log("retrieving categories");
  const q = `SELECT * from category`;
  db.query(q, (err, data) => {
    if (err) {
      // console.log(err);
      return res.status(400).json(err);
    } else {
      // console.log(data);
      return res.status(200).json(data);
    }
  });
});

app.get("/subCategories", (req, res) => {
  console.log("retrieving subcategories");
  const q = `SELECT * from sub_category`;
  db.query(q, (err, data) => {
    if (err) {
      // console.log(err);
      return res.status(400).json(err);
    } else {
      // console.log(data);
      return res.status(200).json(data);
    }
  });
});

app.get("/getSubCategory/:id", (req, res) => {
  console.log("retrieving getSubCategory/:id");
  const id = req.params.id;
  const q = `SELECT * from sub_category where id_subcategory=${id}`;
  db.query(q, (err, data) => {
    if (err) {
      return res.status(400).json(err);
    } else {
      return res.status(200).json(data);
    }
  });
});

app.get("/getCategory/:id", (req, res) => {
  console.log("retrieving /getCategory/:id");
  const id = req.params.id;
  const q = `SELECT * from category where id_category=${id}`;
  db.query(q, (err, data) => {
    if (err) {
      return res.status(400).json(err);
    } else {
      return res.status(200).json(data);
    }
  });
});

app.get("/getProducts/:id", (req, res) => {
  console.log("retrieving /getProducts/:id");
  const q = `SELECT id_product, title, img, img2, price, isNew from product where type="${req.params.id}"`;
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    } else {
      return res.status(200).json(data);
    }
  });
});

app.get("/getProductById/:id", (req, res) => {
  console.log("retrieving /getProductById/:id");
  const q = `SELECT * from product where id_product=${req.params.id}`;
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    } else {
      return res.status(200).json(data);
    }
  });
});

const getSubCats = (q) => {
  return new Promise((resolve, reject) => {
    db.query(q, (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        subCatIds = data;
        resolve(data);
      }
    });
  });
};

const getSubCatDetails = (q) => {
  return new Promise((resolve, reject) => {
    db.query(q, (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        subCatIds = data;
        resolve(data);
      }
    });
  });
};

app.get("/get_category_subcategory/:id", async (req, res) => {
  console.log("retrieving /get_category_subcategory/:id");
  const q = `SELECT id_subCategory from category_subcategory where id_category=${req.params.id}`;
  let subCatDetails = [];
  try {
    const subCats = await getSubCats(q);
    subCatDetails = await Promise.all(
      subCats.map((subCat) => {
        const q = `SELECT id_subCategory, title from sub_category where id_subCategory = ${subCat.id_subCategory}`;
        return getSubCatDetails(q);
      })
    );
    return res.status(200).json(subCatDetails);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

app.get("/get_subcategory_category/:id", async (req, res) => {
  console.log("retrieving /get_subcategory_category/:id");
  const q = `SELECT id_category from category_subcategory where id_subCategory=${req.params.id}`;
  let subCatDetails = [];
  try {
    const subCats = await getSubCats(q);
    subCatDetails = await Promise.all(
      subCats.map((subCat) => {
        const q = `SELECT id_category, title from category where id_category = ${subCat.id_category}`;
        return getSubCatDetails(q);
      })
    );
    return res.status(200).json(subCatDetails);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

app.post("/addSubCategory", (req, res) => {
  console.log("retrieving /get_subcategory_category/:id");
  const { title, category, img } = req.body;
  let insertId = "";
  const s = `SELECT id_subCategory from sub_category where title = "${title}"`;
  db.query(s, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    } else {
      if (data.length === 0) {
        const q = `INSERT INTO \`sub_category\`(\`title\`, \`img\`) VALUES ("${title}", "${img}")`;
        db.query(q, (err, data) => {
          if (err) {
            console.log(err);
            return res.status(400).json(err);
          } else {
            insertId = data.insertId;
            if (category !== 0) {
              const r = `INSERT INTO \`category_subcategory\`(\`id_category\`, \`id_subCategory\`) VALUES ("${category}", "${insertId}")`;
              db.query(r, (err, data) => {
                if (err) {
                  console.log(err);
                  return res.status(400).json(err);
                } else {
                  return res.status(200).json("Successful");
                }
              });
            }
          }
        });
      } else {
        if (category !== 0) {
          insertId = data[0].id_subCategory;
          const r = `INSERT INTO \`category_subcategory\`(\`id_category\`, \`id_subCategory\`) VALUES ("${category}", "${insertId}")`;
          db.query(r, (err, data) => {
            if (err) {
              console.log(err);
              return res.status(400).json(err);
            } else {
              return res.status(200).json("Successful");
            }
          });
        }
      }
    }
  });
});

app.get("/getProductsByCategory", (req, res) => {
  console.log("retrieving /getProductsByCategory");
  const id = req.query.id;
  const maxPrice = req.query.maxPrice;
  const sort = req.query.sort;
  const subCats = req.query.subCats;
  let q = "";
  if (subCats.length > 0) {
    q = `select * from product_subcategory NATURAL JOIN (select * from  product where id_product in (select id_product from product_category where id_category = ${id}) and price<=${maxPrice}) as t where id_subCategory in (${subCats}) ORDER BY price ${sort}`;
  } else {
    q = `select * from  product where id_product in (select id_product from product_category where id_category = ${id}) and price<=${maxPrice} ORDER BY price ${sort}`;
  }
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    } else {
      // console.log(data);
      return res.status(200).json(data);
    }
  });
});

app.get("/getProductsBySubCategory", (req, res) => {
  console.log("retrieving /getProductsBySubCategory");
  const id = req.query.id;
  const maxPrice = req.query.maxPrice;
  const sort = req.query.sort;
  const Cats = req.query.subCats;
  let q = "";
  if (Cats.length > 0) {
    q = `select * from product_category NATURAL JOIN (select * from  product where id_product in (select id_product from product_subcategory where id_subcategory = ${id}) and price<=${maxPrice}) as t where id_category in (${Cats}) ORDER BY price ${sort}`;
  } else {
    q = `select * from product where id_product in (select id_product from product_subcategory where id_subCategory = ${id}) and price<=${maxPrice} ORDER BY price ${sort}`;
  }
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    } else {
      // console.log(data);
      return res.status(200).json(data);
    }
  });
});

app.post("/signup", async (req, res) => {
  console.log("executing signup");
  const username = req.body.username;
  const email = req.body.email;
  let password = req.body.password;
  const img = req.body.img;
  try {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
  const q = `INSERT INTO \`users\`(\`username\`, \`email\`, \`password\`, \`img\`) VALUES ('${username}','${email}','${password}', "${img}")`;
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    } else {
      // console.log(data);
      return res.status(200).json(data);
    }
  });
});

app.post("/addadmin", async (req, res) => {
  console.log("executing addadmin");
  const username = req.body.username;
  const email = req.body.email;
  const img = req.body.img;
  let password = req.body.password;
  try {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
  const q = `INSERT INTO \`users\`(\`username\`, \`email\`, \`password\`, \`isAdmin\`, \`img\`) VALUES ('${username}','${email}','${password}',true, "${img}")`;
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    } else {
      // console.log(data);
      return res.status(200).json(data);
    }
  });
});

app.post("/login", (req, res) => {
  console.log("executing login");
  const email = req.body.email;
  let password = req.body.password;

  const q = `Select * from users where email = '${email}'`;
  db.query(q, async (err, data) => {
    if (err) {
      return res.status(500).json("Internal Server Error");
    } else {
      if (data.length !== 0) {
        let s = data[0];
        try {
          const validPassword = await bcrypt.compare(password, s.password);
          if (validPassword) {
            let obj = {
              username: s.username,
              isAdmin: s.isAdmin,
              email: s.email,
              user_id: s.user_id,
              img: s.img,
            };
            return res.status(200).json(obj);
          } else {
            return res.status(404).json("Wrong Password");
          }
        } catch (error) {
          return res.status(500).json("Internal Server Error");
        }
      } else {
        return res.status(404).json("Email is not registered");
      }
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
