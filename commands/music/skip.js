const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'skip',
    aliases: ['s', 'next'],
    description: 'Skip the current song',
    
    async execute(message, args, client) {
        if (!client.queues.has(message.guild.id)) {
            return message.reply('No music playing!');
        }
        
        const queue = client.queues.get(message.guild.id);
        
        if (!queue.isPlaying) {
            return message.reply('No music playing!');
        }
        
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.reply('You need to be in a voice channel to skip!');
        }
        
        // Vote skip system
        const membersInChannel = voiceChannel.members.filter(m => !m.user.bot).size;
        const requiredVotes = Math.ceil(membersInChannel / 2);
        
        queue.voteSkips.add(message.author.id);
        
        if (queue.voteSkips.size >= requiredVotes || message.member.permissions.has('ManageChannels')) {
            const skipped = queue.skip(message);
            
            if (skipped) {
                const embed = new EmbedBuilder()
                    .setColor('#00FF00')
                    .setDescription('⏭️ Skipped the current song!')
                    .setTimestamp();
                
                message.channel.send({ embeds: [embed] });
                queue.voteSkips.clear();
            }
        } else {
            const embed = new EmbedBuilder()
                .setColor('#FFFF00')
                .setDescription(`🗳️ Vote to skip! ${queue.voteSkips.size}/${requiredVotes} votes needed`)
                .setTimestamp();
            
            message.channel.send({ embeds: [embed] });
        }
    }
};
