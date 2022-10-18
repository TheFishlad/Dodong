const Command = require("../structures/command.js");

module.exports = new Command({
	name: "pause",
	aliases: [],
	description: "I'll pause the music and hold on to it for us!",
	permission: "SEND_MESSAGES",
	async run(message, args, client, slash) {
        const queue = client.player.getQueue(message.guild);
        if (!queue || !queue.playing) return;
        const paused = queue.setPaused(true);
		if(paused)
			slash ? message.reply({embeds: [{ description: `⏸️ Track paused.`, color: 0x44b868 }]}) : message.react('⏸️');
	}
});