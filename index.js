const axios = require('axios');
const prompt = require('prompt-sync')();

const printPlayerPair = async () => {
	try {
		const url = "https://mach-eight.uc.r.appspot.com/";
		const response = await axios.get(url);
		const inputValue = prompt("Input an integer: ", "0");
		const inputHeight = parseInt(inputValue);
		const sortedArray = [];
		const resultArray = [];
		const playderData = response.data.values;
		playderData.forEach(curr => {
			const height = curr['h_in'];
			const el = sortedArray.find(sorted => {
				return sorted.height1 == height || sorted.height2 == height;
			})
			if (el == undefined) {
				sortedArray.push({
					height1: height * 1,
					height2: inputHeight - height,
					currData: [curr],
					pairData: []
				});
			} else if (el.height1 == height) {
				el.currData.push(curr);
			} else {
				el.pairData.push(curr);
			}
		});
		sortedArray.forEach(sa => {
			sa.currData.forEach(currArray => {
				sa.pairData.forEach(pairArray => {
					resultArray.push(`- ${currArray["first_name"]} ${currArray["last_name"]}  ${pairArray["first_name"]} ${pairArray["last_name"]}`);
				})
			})
		})
		for (let index = 0; index < resultArray.length; index++) {
			const pairedName = resultArray[index];
			console.log(pairedName);
		}
		if (resultArray.length == 0) {
			console.log("No matches found.");
		}

	} catch (error) {
		console.log(error);
	}
};
printPlayerPair();
