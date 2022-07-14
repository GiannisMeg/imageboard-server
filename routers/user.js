const { Router } = require("express");
const User = require("../models").user;
// import bcrypt
const bcrypt = require("bcrypt");
// import token
const { toJWT, toData } = require("../auth/jwt");

const router = new Router();

router.get("/", async (req, res, next) => {
	try {
		const users = await User.findAll();
		res.send(users);
	} catch (err) {
		next(err);
	}
});

router.post("/", async (req, res, next) => {
	try {
		// email, name => frontend
		const { email, fullName, password } = req.body;
		if (!email || !fullName || !password) {
			res.status(400).send("Missing parameters");
		}
		// here we encrypt our password and we pass it down when we destructure to create an newUSER
		const encrypted = bcrypt.hashSync(password, 10);
		const newUser = await User.create({
			fullName,
			email,
			password: encrypted,
		});

		// delete newUser.password -> we make sure that pass never present in the Json response
		delete newUser.dataValues["password"];
		res.json(newUser);
	} catch (e) {
		console.log(e.message);
		next(e);
	}
});

router.post("/login", async (req, res, next) => {
	try {
		// 1. get{email, password} from body
		const { email, password, fullName } = req.body;
		if (!email || !password || !fullName) {
			return res.status(400).send("missing parameter");
		} else {
			//2. find user with mail
			const user = await User.findOne({
				where: { email: email },
			});

			if (!user) return res.status(400).send("wrong credentials");
			//3. compare passwords
			const samePasswords = bcrypt.compareSync(password, user.password);
			if (samePasswords) {
				// give them something to prove they logged in
				const token = toJWT({ userId: user.id }); //userId: 4
				console.log("All good");
				res.send({ message: "welcome!!! you are logged in", token });
			} else {
				return res.status(400).send({ message: "Wrong credentials" });
			}
		}
	} catch (err) {
		next(err);
	}
});

module.exports = router;
