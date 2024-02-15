import { Client, RESTPostAPIApplicationCommandsJSONBody } from "discord.js";
import { glob } from "glob";
import { Command } from "../types";

module.exports = async (client: Client) => {
  const slashCommands: RESTPostAPIApplicationCommandsJSONBody[] = [];
  const commands: Command[] = [];
  const commandFiles = await glob(`${__dirname}/../commands/*/*{.ts,.js}`);
  commandFiles.map((val) => {
    const file = require(val);
    const split = val.split("/");
    const directory = split[split.length - 2];
    if (file.default.name) {
      const property = { directory, ...file };
      commands.push(file.default);
      client.commands.set(file.default.name, property);
    }
  });
  const slashCommandFiles = await glob(
    `${__dirname}/../slashCommands/*/*{.ts,.js}`,
  );

  slashCommandFiles.map((val) => {
    const cmd = require(val);
    const command = cmd.default;
    if (!command.name) return;
    slashCommands.push(command.command);
    client.slashCommands.set(command.name, command);
  });

  client.on("ready", async () => {
    const guild = client.guilds.cache.get(process.env.devGuild);

    if (guild) {
      await guild.commands.set(slashCommands);
      console.log("Slash commands set successfully!");
    } else {
      console.error(
        "Unable to find the specified guild for setting slash commands.",
      );
    }
  });
};
