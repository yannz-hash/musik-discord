const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['h', 'commands'],
    description: 'Show all commands',
    
    async execute(message, args, client) {
        const categories = {};
        
        // Categorize commands
        client.commands.forEach(command => {
            const category = command.category || 'General';
            if (!categories[category]) {
                categories[category] = [];
            }
            categories[category].push(command);
        });
        
        const embed = new EmbedBuilder()
            .setColor('#5865F2')
            .setTitle('🎵 Music Bot Help')
            .setDescription(`Use \`${process.env.PREFIX}command\` to execute commands`)
            .setTimestamp();
        
        for (const [category, commands] of Object.entries(categories)) {
            const commandList = commands.map(cmd => {
                return `\`${cmd.name}\` - ${cmd.description}`;
            }).join('\n');
            
            embed.addFields({ name: `**${category}**`, value: commandList });
        }
        
        embed.addFields({
            name: '📝 Additional Info',
            value: `• Prefix: \`${process.env.PREFIX}\`
                   • Use \`${process.env.PREFIX}help <command>\` for more info
                   • [Invite Bot](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)`
        });
        
        message.channel.send({ embeds: [embed] });
    }
};
