import { Module } from '@nestjs/common';
import { TokenGuard } from './guards/token/token.guard';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [ConfigModule],
  providers: [{ provide: APP_GUARD, useClass: TokenGuard }],
})
export class CommonModule {}
