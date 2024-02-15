import { config } from "dotenv";
import { Client, Partials, GatewayIntentBits, Collection } from "discord.js";

import { Command, SlashCommand } from "./types";
import { readdirSync } from "fs";
import { join } from "path";
import mongoose from "mongoose";

const {
  Guilds,
  MessageContent,
  GuildMessages,
  DirectMessageReactions,
  DirectMessageTyping,
  DirectMessages,
  GuildMembers,
} = GatewayIntentBits;
const client = new Client({
  intents: [
    Guilds,
    DirectMessages,
    DirectMessageTyping,
    MessageContent,
    GuildMessages,
    GuildMembers,
    DirectMessageReactions,
  ],
  partials: [
    Partials.Channel,
    Partials.Reaction,
    Partials.Message,
    Partials.GuildMember,
    Partials.User,
  ],
});
config();

client.slashCommands = new Collection<string, SlashCommand>();

// @ts-ignore
client.commands = new Collection<string, Command>();
// @ts-ignore
client.cooldowns = new Collection<string, number>();

const MONGO_URI = process.env.MONGODB_URI;
if (!MONGO_URI) {
  console.log("No mongo URI found");
}
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Successfully connected to MongoDB."))
  .catch((err) => console.log(err.message));

const handlersDir = join(__dirname, "./handlers");
readdirSync(handlersDir).forEach((handler) => {
  require(`${handlersDir}/${handler}`)(client);
});
client.login(process.env.DISCORD_TOKEN).then(() => console.log("Logged in."));
