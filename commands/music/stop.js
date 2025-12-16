const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'stop',
    aliases: ['disconnect', 'leave'],
    description: 'Stop the music and clear the queue',
    
    async execute(message, args, client) {
        if (!client.queues.has(message.guild.id)) {
            return message.reply('No music playing!');
        }
        
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.reply('You need to be in a voice channel to stop music!');
        }
        
        const queue = client.queues.get(message.guild.id);
        queue.stop();
        
        const embed = new EmbedBuilder()
            .setColor('#FF0000')
            .setDescription('⏹️ Stopped the music and cleared the queue!')
            .setTimestamp();
        
        message.channel.send({ embeds: [embed] });
    }
};
