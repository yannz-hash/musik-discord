const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'repeat',
    aliases: ['loop'],
    description: 'Set repeat mode (off/song/queue)',
    usage: '<off/song/queue>',
    
    async execute(message, args, client) {
        if (!client.queues.has(message.guild.id)) {
            return message.reply('No music playing!');
        }
        
        const queue = client.queues.get(message.guild.id);
        const modes = ['off', 'song', 'queue'];
        
        if (!args.length) {
            // Toggle through modes
            const currentIndex = modes.indexOf(queue.repeatMode);
            queue.repeatMode = modes[(currentIndex + 1) % modes.length];
        } else {
            const mode = args[0].toLowerCase();
            if (!modes.includes(mode)) {
                return message.reply('Please use: off, song, or queue');
            }
            queue.repeatMode = mode;
        }
        
        const embed = new EmbedBuilder()
            .setColor('#FFA500')
            .setDescription(`🔁 Repeat mode set to: **${queue.repeatMode}**`)
            .setTimestamp();
        
        message.channel.send({ embeds: [embed] });
    }
};
