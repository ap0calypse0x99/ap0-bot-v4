import { Client } from "discord.js";
import { Command } from "../../types";

const command: Command = {
  name: "greet",
  execute: (message, args, client: Client) => {
    let toGreet = message.mentions.members?.first();
    message.channel.send(
      `Hello there ${toGreet ? toGreet.user.username : message.member?.user.username}!`,
    );
  },
  cooldown: 10,
  aliases: ["saygreet"],
  permissions: ["Administrator"], // to test
};

export default command;
