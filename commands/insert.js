const Command = require("../structures/command.js");

module.exports = new Command({
	name: "insert",
    aliases: ['i', 'pn', 'playnext'],
	description: "I'll move whichever song you like to be played next.",
	permission: "SEND_MESSAGES",
    options: [
        { description: 'URL or song name', name: 'song', required: true, type: 3 }
    ],
	async run(message, args, client, slash) {
        if(!message.member.voice.channelId)
            return message.reply({ embeds: [{ description: `We've got to settle down somewhere first!`, color: 0xb84e44 }], ephemeral: true });
        if(message.guild.members.me.voice.channelId && message.member.voice.channelId !== message.guild.members.me.voice.channelId)
            return message.reply({ embeds: [{ description: `You are not in my voice channel! Don't be afraid to swim on by!`, color: 0xb84e44 }], ephemeral: true });
		
		const queue = client.player.getQueue(message.guild);
		if(!queue || !args[0]) return;
        
        if(slash) await message.deferReply();
        let query = args.join(" "), reply = {};
        const searchResult = await client.player.search(query, { requestedBy: slash ? message.user : message.author, searchEngine: "dodong" })
        if (!searchResult || !searchResult.tracks.length)
            reply = { embeds: [{ description: `No results found!`, color: 0xb84e44 }], ephemeral: true };
        
        else if(searchResult.playlist)
            reply = { embeds: [{ description: `This command does not support playlists.\nUse **${client.prefix}play** instead.`, color: 0xb84e44 }], ephemeral: true };
		
		else {
            queue.insert(searchResult.tracks[0], 0);

            reply = {
                embeds: [{
                    description: `Queued **[${searchResult.tracks[0].title}](${searchResult.tracks[0].url})** at position **1**`,
                    color: 0x44b868
                }]
            };
        }
		if(slash) message.editReply(reply);
		else message.reply(reply);
	}
});
