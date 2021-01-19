const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const getPostTitles = async () => {
	try {
		const { data } = await axios.get(
			'https://www.basketball-reference.com/leagues/NBA_2021_totals.html'
		);
		const $ = cheerio.load(data);
		const postTitles = [];

		$("tbody > tr > td").each((_idx, el) => {
			const postTitle = $(el).text()
			postTitles.push(postTitle)
		});
		console.log(postTitles.length / 29);
		return postTitles;
	} catch (error) {
		throw error;
	}
};

getPostTitles()
.then((postTitles) => {
    rows = [];
    for (i=0; i<(postTitles.length + 500); i++){
        rows.push(postTitles.splice(0, 29))
	}
	console.log(rows.length);
 	fs.writeFile('rows.json', JSON.stringify(rows), function (err) {
		if (err) {
			console.error('err');
		}
	}) 
});