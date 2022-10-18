const Command = require("../structures/command.js");

module.exports = new Command({
	name: "skip",
    aliases: ['n', 'next'],
	description: "I'll skip us to the next song in queue!",
	permission: "SEND_MESSAGES",
	async run(message, args, client, slash) {
        const queue = client.player.getQueue(message.guild);
        if (!queue || !queue.playing) return;
        const success = queue.skip();
        if(success)
            slash ? message.reply({embeds: [{ description: `⏭️ Our new song is on now!`, color: 0x44b868 }]}) : message.react("⏭️");
	}
});