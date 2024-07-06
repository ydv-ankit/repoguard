const chalk = require('chalk');
const { LogError, LogSuccess } = require('../utils/Logger');
const fetch = require('node-fetch');
const Loader = require('../utils/spinner');

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
			const loader = new Loader('Fetching repo info');
			loader.start();
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
						pemissions:
							(data?.permissions &&
								Object.keys(data.permissions).map(
									key => `${key}: ${data.permissions[key]}`
								)) ||
							[]
					};
					const repoKeys = Object.keys(repoData);
					loader.stop();
					repoKeys.map(key => {
						console.log(`${key}: ${repoData[key]}`);
					});
				})
				.catch(err => {
					loader.stop();
					if (err.message === 'Not Found')
						LogError('fatal: repository not found');
					else LogError('Error fetching repo');
				});
		},
		delete: ({ owner, repo }) => {
			const loader = new Loader('deleting repo');
			loader.start();
			const url = `https://api.github.com/repos/${owner}/${repo}`;
			this.request(url, 'DELETE')
				.then(data => {
					loader.stop();
					LogSuccess('Repository deleted successfully');
				})
				.catch(err => {
					loader.stop();
					if (err.message === 'Forbidden')
						LogError("fatal: don't have permission to delete repo");
					else if (err.message === 'Not Found')
						LogError('fatal: repository not found');
					else LogError('Error deleting repo');
				});
		},
		create: repo_details => {
			const loader = new Loader('Creating repo');
			loader.start();
			const url = `https://api.github.com/user/repos`;
			this.request(url, 'POST', repo_details)
				.then(data => {
					loader.stop();
					LogSuccess('Repository created successfully');
				})
				.catch(err => {
					loader.stop();
					LogError('Error creating repo');
				});
		},
		list: username => {
			const loader = new Loader('Fetching repo info');
			loader.start();
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
					loader.stop();
					repos.map(repo => {
						const repoKeys = Object.keys(repo);
						repoKeys.map(key => {
							console.log(`${key}: ${repo[key]}`);
						});
						console.log(
							chalk.blue('=====================================')
						);
					});
				})
				.catch(err => {
					loader.stop();
					LogError('Error fetching repos');
				});
		},
		update: ({ owner, repo, updates }) => {
			const loader = new Loader('Updating repo');
			loader.start();
			const url = `https://api.github.com/repos/${owner}/${repo}`;
			this.request(url, 'PATCH', updates)
				.then(data => {
					loader.stop();
					LogSuccess('Repository updated successfully');
				})
				.catch(err => {
					loader.stop();
					LogError('Error updating repo');
				});
		}
	};

	collaborators = {
		getAll: ({ owner, repo }) => {
			const loader = new Loader('Fetching collaborators');
			loader.start();
			const url = `https://api.github.com/repos/${owner}/${repo}/collaborators`;
			this.request(url)
				.then(data => {
					const collaborators = data.map(collaborator => {
						return {
							'collaborator id': collaborator.id,
							collaborator: collaborator.login,
							'collaborator url': collaborator.html_url,
							'collaborator type': collaborator.type,
							'collaborator site admin': collaborator.site_admin,
							permissions:
								(collaborator?.permissions &&
									Object.keys(collaborator.permissions).map(
										key =>
											`(${key}): ${collaborator.permissions[key]}`
									)) ||
								[]
						};
					});
					loader.stop();
					collaborators.map(collaborator => {
						const collaboratorKeys = Object.keys(collaborator);
						const keyCol = chalk.rgb(25, 225, 20);
						const valCol = chalk.rgb(225, 225, 225);
						collaboratorKeys.map(key => {
							console.log(
								`${keyCol(key)}: ${valCol(collaborator[key])}`
							);
						});
						console.log(
							chalk.blue('=====================================')
						);
					});
				})
				.catch(err => {
					loader.stop();
					LogError('Error fetching collaborators');
				});
		},
		getUser: ({ owner, repo, username }) => {
			const loader = new Loader('Fetching collaborator');
			loader.start();
			const url = `https://api.github.com/repos/${owner}/${repo}/collaborators/${username}`;
			this.request(url)
				.then(data => {
					loader.stop();
					LogSuccess('Collaborator found');
				})
				.catch(err => {
					loader.stop();
					if (err.message === 'Not Found')
						LogError('fatal: collaborator not found');
					else LogError('Error fetching collaborator');
				});
		},
		addUsers: ({ owner, repo, users }) => {
			let isError = false;
			const loader = new Loader('Adding collaborators');
			loader.start();
			users.forEach(user => {
				const url = `https://api.github.com/repos/${owner}/${repo}/collaborators/${user}`;
				this.request(url, 'PUT').catch(err => {
					loader.stop();
					isError = true;
					LogError('Error adding collaborator');
				});
			});
			if (!isError) {
				loader.stop();
				LogSuccess(
					`${users.length > 1 ? 'collaborators' : 'collaborator'} invited successfully`
				);
			}
		},
		removeUsers: ({ owner, repo, users }) => {
			let isError = false;
			const loader = new Loader('Removing collaborators');
			loader.start();
			users.forEach(user => {
				const url = `https://api.github.com/repos/${owner}/${repo}/collaborators/${user}`;
				this.request(url, 'DELETE').catch(err => {
					loader.stop();
					isError = true;
					LogError(`Error removing collaborator ${user}`);
				});
			});
			if (!isError) {
				loader.stop();
				LogSuccess(
					`${users.length > 1 ? 'collaborators' : 'collaborator'} removed successfully`
				);
			}
		},
		getInvites: ({ owner, repo }) => {
			const loader = new Loader('Fetching invited users');
			loader.start();
			const url = `https://api.github.com/repos/${owner}/${repo}/invitations`;
			this.request(url)
				.then(data => {
					const invites = data.map(invite => {
						return {
							'invite id': invite.id,
							invitee: invite.invitee.login,
							inviter: invite.inviter.login,
							permissions: invite.permissions,
							'invite url': invite.html_url,
							'invite created at': invite.created_at
						};
					});
					loader.stop();
					invites.map(invite => {
						const inviteKeys = Object.keys(invite);
						inviteKeys.map(key => {
							console.log(`${key}: ${invite[key]}`);
						});
						console.log(
							chalk.blue('=====================================')
						);
					});
				})
				.catch(err => {
					loader.stop();
					console.log(err);
					LogError('Error fetching invites');
				});
		},
		removeInvitation: ({ owner, repo, invite_id }) => {
			const loader = new Loader('Removing invitation');
			loader.start();
			const url = `https://api.github.com/repos/${owner}/${repo}/invitations/${invite_id}`;
			this.request(url, 'DELETE')
				.then(data => {
					loader.stop();
					LogSuccess('invitation removed successfully');
				})
				.catch(err => {
					loader.stop();
					LogError('error: check if invite id is correct');
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
						const contentType = res.headers.get('content-type');
						if (
							contentType &&
							contentType.includes('application/json')
						) {
							const data = await res.json();
							resolve(data);
						} else {
							// Handle cases where response body is empty or not JSON
							resolve(null); // Resolve with null or handle appropriately
						}
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
