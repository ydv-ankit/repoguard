class GithubClient {
	constructor(token) {
		this.headers = {
			Accept: 'application/vnd.github+json',
			Authorization: `Bearer ${token}`,
			'X-GitHub-Api-Version': '2022-11-28'
		};
		return (this.request = this.request.bind(this));
	}
	request(url, method = 'GET', data = null, headers = null) {
		const constructHeaders =
			(headers && Object.assign(this.headers, headers)) || this.headers;
		const ApiOptions = {
			method: method,
			headers: constructHeaders
		};
		if (data) {
			ApiOptions.body = JSON.stringify(data);
		}
		return fetch(url, ApiOptions)
			.then(res => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.catch(err => {
				throw new Error(err);
			});
	}
}

module.exports = { GithubClient };
