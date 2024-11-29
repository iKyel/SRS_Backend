import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TheLoai } from './the-loai/entities/the-loai.entity';
import { TheLoaiModule } from './the-loai/the-loai.module';
import { TacgiaModule } from './tacgia/tacgia.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'bookstoresrs_db',
      autoLoadEntities: true,
      synchronize: false,
    }),
    TheLoaiModule,
    TacgiaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
