import { Markup, Telegraf } from "telegraf";
import { IBotContext } from "../context/IContext";
import joke from '../joke.json';

export abstract class Command {
    constructor(public bot: Telegraf<IBotContext>) {}

    abstract handle(): void;
}

export class StartCommand extends Command {
    constructor(public bot: Telegraf<IBotContext>) {
        super(bot);
    }

    handle(): void {
        this.bot.start((context) => {
            console.log(context.session);
            context.reply("Рассказать анекдот?", Markup.inlineKeyboard([
                Markup.button.callback("Да", "Yes"),
                Markup.button.callback("Нет", "No"), 
            ]))
        })

        this.bot.action("Yes", (context) => {
            context.session.tellJoke = true;
            context.editMessageText(randJoke(joke.joke));
        })

        this.bot.action("No", (context) => {
            context.session.tellJoke = false;
            context.editMessageText("Ну и ладно...");
        })
    }
}

const randJoke = (joke: string[]) => {
    const rd: number = Math.floor(Math.random() * 10)

    return joke[rd];
}
