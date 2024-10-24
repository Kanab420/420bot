const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFolders = fs.readdirSync('./src/commands')
        for (const folder of commandFolders) {
            const commandFiles = fs
                .readdirSync(`./src/commands/${folder}`)
                .filter((file) => file.endsWith(".js"));

            const { commands, commandArray } = client;
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
                console.log(`Command : ${command.data.name} has been passed through the handler`);
            }
        }

        const clientId = '1299035170531315732';
        const guildId = '1281706328699572224';
        const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);
        try {
            console.log("Started refreshing weed (/) commands.");

            await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
                body: client.commandArray,
            });

            console.log("Successfully reloaded weed (/) commands.");
        } catch (error) {
            console.error(error);
        }
    }
}