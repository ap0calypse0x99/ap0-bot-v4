// greet.ts
import {
  SlashCommandBuilder,
  EmbedBuilder,
  CommandInteraction,
} from "discord.js";
import { SlashCommand } from "../../types";

export const command: SlashCommand = {
  name: "ping",
  command: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Shows the bots ping"),
  execute: async (interaction: CommandInteraction) => {
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("FUCK YOU LICENSE")
          .setDescription(`🏓 Pong! \n 📡 Ping: ${interaction.client.ws.ping}`)
          .setColor("Random")
          .setTimestamp(),
      ],
    });
  },
  cooldown: 10,
};

export default command;
