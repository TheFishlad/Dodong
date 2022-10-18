const Command = require("../structures/command.js");

module.exports = new Command({
	name: "grab",
    aliases: ['g'],
	description: "I'll pass along a secret note!",
	permission: "SEND_MESSAGES",
	async run(message, args, client, slash) {
        const queue = client.player.getQueue(message.guild);
        if (!queue || !queue.playing) {
            return message.reply({ embeds: [{ description: `Aww, nothings on right now... Want to change that?`, color: 0xb84e44 }], ephemeral: true });
        }
		if (slash)
			message.reply({ embeds: [{ description: `I gave you a private message, take a peek!`, color: 0x44b868 }], ephemeral: true });
		else
			message.react('📩');
	
		let playlist = "";
		if(queue.current.playlist)
			playlist = ` ┃ From: [${queue.current.playlist.title}](${queue.current.playlist.url})`;
	if(message.author == undefined){
		message.author = message.user;
	}
        return message.author.send({ embeds: [{
			description: `**[${queue.current.title}](${queue.current.url})**\nby ${queue.current.author}\n\n` +
						`${queue.current.duration}${playlist}`,
			thumbnail: {
				url: `${queue.current.thumbnail}`
			},
			footer: {
				text: `queued by ${queue.current.requestedBy.username}#${queue.current.requestedBy.discriminator}`
			},
			color: 0x44b868
        }]});
	}
});
