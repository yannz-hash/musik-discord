const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'shuffle',
    aliases: ['mix'],
    description: 'Shuffle the queue',
    
    async execute(message, args, client) {
        if (!client.queues.has(message.guild.id)) {
            return message.reply('No music queue found!');
        }
        
        const queue = client.queues.get(message.guild.id);
        
        if (queue.queue.length < 2) {
            return message.reply('Need at least 2 songs in queue to shuffle!');
        }
        
        const shuffled = queue.shuffle();
        
        if (shuffled) {
            const embed = new EmbedBuilder()
                .setColor('#9B59B6')
                .setDescription('🔀 Shuffled the queue!')
                .setTimestamp();
            
            message.channel.send({ embeds: [embed] });
        }
    }
};
