module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`420 Momento Ready | User: ${client.user.tag}`);
    }
}