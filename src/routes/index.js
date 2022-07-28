import express from "express";
import Model from "../models/model.js";
const router = express.Router();

const entriesModel = new Model("entries");

const entriesPage = async (req, res) => {
	try {
		await entriesModel.insert(
			`'${req.body.title.replace("'", "''")}', '${req.body.site}', ${
				req.body.timestamp
			}, '${req.body.url}', ${req.body.price}`
		);
		res.status(200).json({ result: "success" });
	} catch (err) {
		res.status(200).json({ entries: err.stack });
	}
};

router.get("/getEntries", async (req, res) => {
	try {
		res
			.status(200)
			.json(
				await entriesModel.select("*", `WHERE title %> ${req.query.title}`)
			);
	} catch (err) {
		res.status(500).json({ entries: err.stack });
	}
	// res.status(200).json(entriesModel.select())
});

router.post("/addEntry", entriesPage);
console.log("Server is running");
export default router;
