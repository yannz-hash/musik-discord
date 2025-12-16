const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'queue',
    aliases: ['q', 'list'],
    description: 'Show the current music queue',
    
    async execute(message, args, client) {
        if (!client.queues.has(message.guild.id)) {
            return message.reply('No music queue found!');
        }
        
        const queue = client.queues.get(message.guild.id);
        const queueData = queue.getQueue();
        
        if (!queueData.current && queueData.queue.length === 0) {
            return message.reply('The queue is empty!');
        }
        
        const embed = new EmbedBuilder()
            .setColor('#FFA500')
            .setTitle('📋 Music Queue')
            .setDescription(`**Now Playing:** ${queueData.current ? queueData.current.title : 'Nothing'}`)
            .addFields(
                { name: 'Repeat Mode', value: queueData.repeatMode, inline: true },
                { name: 'Volume', value: `${queueData.volume}%`, inline: true },
                { name: 'Queue Length', value: `${queueData.queue.length} songs`, inline: true }
            );
        
        // Show first 10 songs in queue
        if (queueData.queue.length > 0) {
            const queueList = queueData.queue.slice(0, 10).map((track, index) => {
                return `${index + 1}. **${track.title}** - ${track.duration} (Requested by: ${track.requester})`;
            }).join('\n');
            
            embed.addFields({ name: 'Up Next', value: queueList });
            
            if (queueData.queue.length > 10) {
                embed.setFooter({ text: `And ${queueData.queue.length - 10} more songs...` });
            }
        }
        
        // Add control buttons
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('shuffle')
                    .setLabel('🔀 Shuffle')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('clear')
                    .setLabel('🗑️ Clear')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId('repeat')
                    .setLabel('🔁 Repeat')
                    .setStyle(ButtonStyle.Secondary)
            );
        
        message.channel.send({ embeds: [embed], components: [row] });
    }
};
