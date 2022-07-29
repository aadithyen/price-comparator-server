import express from "express";
import Model from "../models/model.js";
const router = express.Router();

const entriesModel = new Model("entries");

const entriesPage = async (req, res) => {
	try {
		let result = await entriesModel.select(
			"id",
			`WHERE title = '${req.body.title.replace("'", "''")}' AND site = '${
				req.body.site
			}' AND timestamp > ${Math.floor(Date.now() / 1000) - 20000}`
		);
		if (result["rowCount"] > 0) {
			await entriesModel.update(
				"price",
				req.body.price,
				`WHERE id = ${result["rows"].at(0).id}`
			);
			await entriesModel.update(
				"timestamp",
				`${req.body.timestamp}`,
				`WHERE id = ${result["rows"].at(0).id}`
			);
			res.status(200).json({ result: "success" });
		} else {
			await entriesModel.insert(
				`'${req.body.title.replace("'", "''")}', '${req.body.site}', ${
					req.body.timestamp
				}, '${req.body.url}', ${req.body.price}`
			);
			res.status(200).json({ result: "success" });
		}
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
