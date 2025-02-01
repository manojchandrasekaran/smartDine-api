const { validationResult } = require("express-validator");
const knex = require("../../config/database/index");
const config = require("../../config/environment/config");
var jwt = require("jsonwebtoken");

async function login(req, res) {
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

    if (!user) {
      return res.status(400).send("User not found");
    }
    if (user.ad_password !== value.ad_password) {
      return res.status(400).send("Invalid password");
    }

    var token = jwt.sign(user, config.jwt_key);

    return res
      .status(200)
      .json({ message: "User logged in successfully!", token });
  } catch (err) {
    console.log("Error in login", err);
  }
}

async function signUp(req, res) {
    try {
        const errors = validationResult(req)
        const value = req.body
        console.log('Req body value=', req.body)
        console.log('Eror iruka=', value)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        // If no errors, proceed with user registration logic
        // const data = await knex.select("*").from("hotels");
        // console.log("hotel data=",data);

        // ...and using the insert id, insert into the other table.
        const ho_response = await knex('hotels').insert({
            ho_name: value.ho_name,
            ho_address: value.ho_address,
        })
        console.log('ho_response from db=', ho_response)

        const ad_response = await knex('admins').insert({
            ad_name: value.ad_name,
            ad_email: value.ad_email,
            ad_password: value.ad_password,
            ad_city: value.ad_city,
            ad_phone_num: value.ad_phone_num,
        })
        console.log('ad_response from db=', ad_response)

        res.status(200).json({ message: 'User registered successfully!' })

        // if (req.body === "") {
        //   return res.status(400).send("Give complete details");
        // } else {
        //   users.push(req.body);
        //   console.log("Array after push=", users);
        // }
    } catch (err) {
        console.log('Error in signup=', err)
    }
}

async function getAdmins(req, res) {
  console.log("Inside getAdmin request");

  const adminResponse = await knex.select("*").from("admins");
  console.log("Admin response=", adminResponse);

  res.status(200).send("Got admin details");
}

async function updateAdmin(req, res) {}

module.exports = { login, signUp, getAdmins, updateAdmin };
