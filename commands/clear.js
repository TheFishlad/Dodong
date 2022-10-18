const Command = require("../structures/command.js");

module.exports = new Command({
	name: "clear",
	aliases: [],
	description: "I'll clean up the queue.",
	permission: "SEND_MESSAGES",
	async run(message, args, client, slash) {
        const queue = client.player.getQueue(message.guild);
        if (queue) {
			queue.clear();

        	slash ? message.reply({embeds: [{ description: `✅ We've got a fresh start!`, color: 0x44b868 }]}) : message.react('✅');
		}
	}
});