async function loadOra() {
    const ora = await import('ora');
    return ora.default;
}

module.exports = { loadOra };