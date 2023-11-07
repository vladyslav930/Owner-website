import { MyPortfolioManagerGuard } from './my-portfolio-manager.guard';
import { NoEntitySettingsGuard } from './no-entity-settings.guard';

export const guards = [
  MyPortfolioManagerGuard,
  NoEntitySettingsGuard,
];
