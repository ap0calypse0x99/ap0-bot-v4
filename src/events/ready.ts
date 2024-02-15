import { Client } from "discord.js";
import { BotEvent } from "../types";

const event: BotEvent = {
  name: "ready",
  once: true,
  execute: (client: Client) => {
    console.log(`${client.user?.tag} Successfully Logged in`);
  },
};

export default event;
