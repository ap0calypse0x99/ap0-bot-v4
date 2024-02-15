import {
  SlashCommandBuilder,
  CommandInteraction,
  PermissionResolvable,
  Message,
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  Client,
  ModalSubmitInteraction,
} from "discord.js";

import mongoose, { Collection } from "mongoose";

export interface SlashCommand {
  name?: string;
  command: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
  autocomplete?: (interaction: AutocompleteInteraction) => void;
  modal?: (interaction: ModalSubmitInteraction) => void;
  cooldown?: number;
}

export interface Command {
  name: string;
  execute: (message: Message, args: Array<string>, client: Client) => void;
  permissions: Array<PermissionResolvable>;
  aliases: Array<string>;
  cooldown?: number;
}

interface GuildOptions {
  prefix: string;
}

export interface IGuild extends mongoose.Document {
  guildID: string;
  options: GuildOptions;
  join;
}

export type GuildOption = keyof GuildOptions;

export interface BotEvent {
  name: string;
  once?: boolean | false;
  execute: (...args) => void;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DISCORD_TOKEN: string;
      CLIENT_ID: string;
      PREFIX: string;
      MONGODB_URI: string;
      devGuild: string;
    }
  }
}

declare module "discord.js" {
  export interface Client {
    slashCommands: Collection<string, SlashCommand>;
    commands: Collection<string, Command>;
    cooldowns: Collection<string, number>;
  }
}
