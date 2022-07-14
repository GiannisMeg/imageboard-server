const { Router } = require("express");
const Image = require("../models").image;

const router = new Router();

router.get("/", async (req, res, next) => {
	try {
		const images = await Image.findAll();
		res.send(images);
	} catch (err) {
		next(err);
	}
});
router.post("/", async (req, res, next) => {
	try {
		// destructure model body
		const { url, title } = req.body;
		if (!url || !title) {
			res.status(400).send("missing url or title");
		} else {
			// provided info destructured again to prevent errors
			const newImage = await Image.create({ url, title });
			res.send(newImage);
		}
	} catch (err) {
		next(err);
	}

	router.get("/:id", async (req, res, next) => {
		try {
			const id = parseInt(req.params.id);
			const getImage = await Image.findByPk(id);
			if (!getImage) {
				res.status(404).send("no image with that id");
			} else {
				res.send(getImage);
			}
		} catch (err) {
			next(err);
		}
	});
});
module.exports = router;
