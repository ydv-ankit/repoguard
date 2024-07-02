const chalk = require('chalk');
const { LogError, LogSuccess } = require('../utils/Logger');
const fetch = require('node-fetch');

class GithubClient {
	constructor(token) {
		this.headers = {
			Accept: 'application/vnd.github+json',
			Authorization: `Bearer ${token}`,
			'X-GitHub-Api-Version': '2022-11-28'
		};
		this.request = this.request.bind(this);
		this.repos = this.repos;

		return this;
	}
	repos = {
		get: ({ owner, repo }) => {
			const url = `https://api.github.com/repos/${owner}/${repo}`;
			this.request(url)
				.then(data => {
					const repoData = {
						'repository id': data?.id,
						repository: data?.name,
						'repo url': data?.html_url,
						isPrivate: data?.private,
						owner: data?.owner?.login,
						description: data?.description,
						'open issues': data?.open_issues,
						topics: data?.topics,
						homepage: data?.homepage,
						forks: data?.forks,
						watchers: data?.watchers,
						visibility: data?.visibility,
						'allow forking': data?.allow_forking,
						pemissions: (data?.permissions && Object.keys(data.permissions).map(key => `${key}: ${data.permissions[key]}`)) || [],
					};
					const repoKeys = Object.keys(repoData);
					repoKeys.map(key => {
						console.log(`${key}: ${repoData[key]}`);
					});
				})
				.catch(err => {
					LogError('Error fetching repo');
				});
		},
		delete: ({ owner, repo }) => {
			const url = `https://api.github.com/repos/${owner}/${repo}`;
			this.request(url, 'DELETE')
				.then(data => {
					console.log(data);
				})
				.catch(err => {
					if (err.message === 'Forbidden')
						LogError("fatal: don't have permission to delete repo");
					else LogError('Error deleting repo');
				});
		},
		create: repo_details => {
			const url = `https://api.github.com/user/repos`;
			this.request(url, 'POST', repo_details)
				.then(data => {
					console.log(data);
					LogSuccess('Repository created successfully');
				})
				.catch(err => {
					LogError('Error creating repo');
				});
		},
		list: username => {
			const url = `  https://api.github.com/users/${username}/repos`;
			this.request(url)
				.then(data => {
					const repos = data.map(repo => {
						return {
							'repository id': repo.id,
							repository: repo.name,
							'repo url': repo.html_url,
							isPrivate: repo.private
						};
					});
					repos.map(repo => {
						const repoKeys = Object.keys(repo);
						repoKeys.map(key => {
							console.log(`${key}: ${repo[key]}`);
						});	
						console.log(chalk.blue("====================================="));
					})
				})
				.catch(err => {
					LogError('Error fetching repos');
				});
		}
	};

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
		return new Promise(async (resolve, reject) => {
			fetch(url, ApiOptions)
				.then(async res => {
					if (!res.ok) {
						throw new Error(res.statusText);
					}
					try {
						const data = await res.json();
						resolve(data);
					} catch (error) {
						throw new Error(error);
					}
				})
				.catch(err => {
					reject(err);
				});
		});
	}
}

module.exports = { GithubClient };
