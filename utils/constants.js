const tokenFilename = 'token';
const tokenFilepath = process.env.HOME
	? `${process.env.HOME}/.repoguard/github/`
	: `${process.env.USERPROFILE}\\.repoguard\\github\\`;

module.exports = {
	tokenFilename,
	tokenFilepath
};
