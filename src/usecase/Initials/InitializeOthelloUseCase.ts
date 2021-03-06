import { UseCase } from "almin";
import { Othello } from "../../domain/Othello";
import othelloRepository, { OthelloRepository } from "../../infra/OthelloRepository";
import loggerRepository, { LoggerRepository } from "../../infra/LoggerRepository";

export class InitializeOthelloUseCase extends UseCase {
  othelloRepository: OthelloRepository;
  loggerRepository: LoggerRepository;

  constructor ({
    othelloRepository,
    loggerRepository,
  } : {
    othelloRepository: OthelloRepository,
    loggerRepository: LoggerRepository,
  }) {
    super();
    this.othelloRepository = othelloRepository;
    this.loggerRepository = loggerRepository;
  }

  static create () { return new this({ othelloRepository, loggerRepository }); }

  execute () {
    const newOthello = Othello.NewGame();
    const logger = loggerRepository.lastUsed();
    this.othelloRepository.save(newOthello);
    logger.log('Starting a new game');
  }
}
