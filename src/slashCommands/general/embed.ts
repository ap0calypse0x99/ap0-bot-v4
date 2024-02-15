// greet.ts
import {
  SlashCommandBuilder,
  EmbedBuilder,
  CommandInteraction,
} from "discord.js";
import { SlashCommand } from "../../types";

// @ts-ignore
const command: SlashCommand = {
  name: "embed",
  // @ts-ignore
  command: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Description Here")
    .addStringOption((option) => {
      return option
        .setName("title")
        .setRequired(false)
        .setDescription("The title of the embed");
    }),

  execute: async (interaction: CommandInteraction) => {
    //@ts-ignore
    const embedTitle = interaction.options.getString("title");
    await interaction.reply({
      content: "Hallo",
      ephemeral: true,
      embeds: [
        new EmbedBuilder()
          .setTitle(embedTitle || null)
          .setDescription("hello!"),
      ],
    });
  },
  cooldown: 10,
};

export default command;
