const request = require('superagent');

const Api = {
	loginFB() {
		return new Promise(function (resolve, reject) {
			request
				.get('/auth/login/facebook')
				.end((err, res) => {
					console.log(res);
					if (res.status === 404) {
						reject();
					} else {
						resolve(JSON.parse(res));
					}
			});
		});
	},
};

export default Api;
