const { validationResult } = require("express-validator");
const knex = require("../../config/database/index");

// const users = [
//   {
//     id: 1,
//     name: "Leanne Graham",
//     username: "Bret",
//     email: "Sincere@april.biz",
//     password: "123",
//     address: {
//       street: "Kulas Light",
//       suite: "Apt. 556",
//       city: "Gwenborough",
//       zipcode: "92998-3874",
//       geo: {
//         lat: "-37.3159",
//         lng: "81.1496",
//       },
//     },
//     phone: "1-770-736-8031 x56442",
//     website: "hildegard.org",
//     company: {
//       name: "Romaguera-Crona",
//       catchPhrase: "Multi-layered client-server neural-net",
//       bs: "harness real-time e-markets",
//     },
//   },
//   {
//     id: 2,
//     name: "Ervin Howell",
//     username: "Antonette",
//     email: "Shanna@melissa.tv",
//     password: "123",
//     address: {
//       street: "Victor Plains",
//       suite: "Suite 879",
//       city: "Wisokyburgh",
//       zipcode: "90566-7771",
//       geo: {
//         lat: "-43.9509",
//         lng: "-34.4618",
//       },
//     },
//     phone: "010-692-6593 x09125",
//     website: "anastasia.net",
//     company: {
//       name: "Deckow-Crist",
//       catchPhrase: "Proactive didactic contingency",
//       bs: "synergize scalable supply-chains",
//     },
//   },
// ];

// const signinArr = [];

async function login(req, res) {
  // const { email, password } = req.body;
  // if (!email || !password) {
  //   return res.status(400).send("Credentials invalid");
  // }
  // const user = users.find((item) => item.email === email);
  // if (!user) {
  //   return res.status(400).send("User not found");
  // }
  // if (user.password !== password) {
  //   return res.status(400).send("Wrong password");
  // }
  // return res.status(200).send(user);

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const value = req.body;

    const user = await knex("admins")
      .where({
        ad_email: value.ad_email,
      })
      .select("*")
      .first();
    // const user = users.find((item) => item.email === email);
    if (!user) {
      return res.status(400).send("User not found");
    }
    if (user.ad_password !== value.ad_password) {
      return res.status(400).send("Invalid password");
    }

    return res.status(200).json({ message: "User logged in successfully!" });
  } catch (err) {
    console.log("Error in login", err);
  }
}

async function signUp(req, res) {
  try {
    const errors = validationResult(req);
    const value = req.body;
    console.log("Req body value=", req.body);
    console.log("Eror iruka=", value);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If no errors, proceed with user registration logic
    // const data = await knex.select("*").from("hotels");
    // console.log("hotel data=",data);

    // ...and using the insert id, insert into the other table.
    const ho_response = await knex("hotels").insert({
      ho_name: value.ho_name,
      ho_address: value.ho_address,
    });
    console.log("ho_response from db=", ho_response);

    const ad_response = await knex("admins").insert({
      ad_name: value.ad_name,
      ad_email: value.ad_email,
      ad_password: value.ad_password,
      ad_city: value.ad_city,
      ad_phone_num: value.ad_phone_num,
    });
    console.log("ad_response from db=", ad_response);

    res.status(200).json({ message: "User registered successfully!" });

    // if (req.body === "") {
    //   return res.status(400).send("Give complete details");
    // } else {
    //   users.push(req.body);
    //   console.log("Array after push=", users);
    // }
  } catch (err) {
    console.log("Error in signup=", err);
  }
}

module.exports = { login, signUp };
