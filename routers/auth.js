const { Router } = require("express");
const { toJWT, toData } = require("../auth/jwt");

const router = new Router();

router.post("/login", async (req, res, next) => {
	try {
		const { email, password } = JSON.body;
		if (!email || !password) {
			res.status(400).send({
				message: "Please supply a valid email and password",
			});
		} else {
			res.send({ jwt: toJWT({ userId: 1 }) });
		}
	} catch (err) {
		next(err);
	}
});

module.exports = router;
