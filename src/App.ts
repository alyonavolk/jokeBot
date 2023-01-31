import { Telegraf } from 'telegraf';
import LocalSession from 'telegraf-session-local';
import { Command, StartCommand } from './commands/Command';
import { ConfigeService } from './ConfigService';
import { IConfigService } from './IConfigService';

class Bot {
    bot: Telegraf<any>;
    command: Command[] = [];

    constructor(private readonly configService: IConfigService) {
        this.bot = new Telegraf<any>(this.configService.getKey("TOKEN"));
        this.bot.use(new LocalSession({database: 'jokeBotSession.json'}).middleware());
    }

    init() {
        this.command = [new StartCommand(this.bot)];
        for(const command of this.command) {
            command.handle();
        }
        this.bot.launch();
    }
}

const bot = new Bot(new ConfigeService());
bot.init();