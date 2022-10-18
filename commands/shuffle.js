const Command = require("../structures/command.js");

module.exports = new Command({
	name: "shuffle",
	aliases: [],
	description: "I'll mix up our current list of songs!",
	permission: "SEND_MESSAGES",
	async run(message, args, client, slash) {
        const queue = client.player.getQueue(message.guild);
        if (!queue) return;
        
        await queue.shuffle();
        slash ? message.reply({embeds: [{ description: `🔀 Shaking things up, give me one second!`, color: 0x44b868 }]}) : message.react('🔀');
	}
});