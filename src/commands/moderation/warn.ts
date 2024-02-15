import { Client } from "discord.js";
import { Command } from "../../types";

const command: Command = {
  name: "",
  execute: (message, args, client: Client) => {
    message.reply("Hello");
  },
  cooldown: 10,
  aliases: [""],
  permissions: ["ManageMessages"], // to test
};

export default command;
