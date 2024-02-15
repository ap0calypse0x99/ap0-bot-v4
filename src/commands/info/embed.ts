import { Message, EmbedBuilder } from "discord.js";
import { Command } from "../../types";

const command: Command = {
  name: "embed",
  execute: (message, args) => {
    let embed = new EmbedBuilder()
      .setDescription(args.splice(1).join(" "))
      .setColor("Random")
      .setTitle("Test Command")
      .setTimestamp();
    message.channel.send({ embeds: [embed] });
  },
  cooldown: 10,
  aliases: [""],
  permissions: ["Administrator"], // to test
};

export default command;
