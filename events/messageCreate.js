const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (message.author.bot || !message.content.startsWith(process.env.PREFIX)) return;
        
        const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        
        const command = client.commands.get(commandName) || 
                       client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        
        if (!command) return;
        
        try {
            await command.execute(message, args, client);
        } catch (error) {
            console.error(error);
            
            const errorEmbed = new EmbedBuilder()
                .setColor('#FF0000')
                .setTitle('❌ Error')
                .setDescription(`An error occurred while executing the command: \`${error.message}\``)
                .setTimestamp();
            
            message.channel.send({ embeds: [errorEmbed] });
        }
    }
};
