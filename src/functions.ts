import {
  Guild,
  GuildMember,
  PermissionsBitField,
  PermissionFlagsBits,
  PermissionResolvable,
  TextChannel,
  DMChannel,
  NewsChannel,
  StageChannel,
  PrivateThreadChannel,
  PublicThreadChannel,
} from "discord.js";
import mongoose from "mongoose";
import GuildDB from "./schemas/Guild";
import { GuildOption } from "./types";

export const checkPermissions = (
  member: GuildMember,
  permissions: Array<PermissionResolvable>,
) => {
  if (!permissions || !Array.isArray(permissions)) {
    console.error("Invalid permissions array provided.");
    return null;
  }
  let neededPermissions: PermissionResolvable[] = [];
  permissions.forEach((permission) => {
    if (!member.permissions.has(permission)) neededPermissions.push(permission);
  });
  if (neededPermissions.length === 0) return null;
  return neededPermissions.map((p) => {
    if (typeof p === "string") return p.split(/(?=[A-Z])/).join(" ");
    else
      return Object.keys(PermissionFlagsBits)
        .find((k) => Object(PermissionFlagsBits)[k] === p)
        ?.split(/(?=[A-Z])/)
        .join(" ");
  });
};

export const sendMessage = (
  message: string,
  channel:
    | TextChannel
    | DMChannel
    | NewsChannel
    | StageChannel
    | PrivateThreadChannel
    | PublicThreadChannel,
  duration: number,
) => {
  channel
    .send(message)
    .then((m) =>
      setTimeout(
        async () => (await channel.messages.fetch(m)).delete(),
        duration * 1000,
      ),
    );
  return;
};

export const getGuildOption = async (guild: Guild, option: GuildOption) => {
  if (mongoose.connection.readyState === 0)
    throw new Error("Database not connected.");
  let foundGuild = await GuildDB.findOne({ guildID: guild.id });
  if (!foundGuild) return null;
  return foundGuild.options[option];
};

export const setGuildOption = async (
  guild: Guild,
  option: GuildOption,
  value: any,
) => {
  if (mongoose.connection.readyState === 0)
    throw new Error("Database not connected.");
  let foundGuild = await GuildDB.findOne({ guildID: guild.id });
  if (!foundGuild) return null;
  foundGuild.options[option] = value;
  foundGuild.save();
};
