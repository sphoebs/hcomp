const request = require('superagent');

const Api = {
	post(url, data) {
		return new Promise(function (resolve, reject) {
			request
				.post(url)
                .send(data)
				.end((err, res) => {
					console.log(res);
					if (res.status === 404) {
						reject();
					} else {
						resolve(res.text);
					}
			});
		});
	},
};

export default Api;