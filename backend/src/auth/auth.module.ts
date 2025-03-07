import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirebaseModule } from './submodules/firebase/firebase.module';
import { Membership, MembershipSchema } from './schemas/membership.schema';
import { MembershipService } from './membership.service';
import { BoothsModule } from 'src/booths/booths.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Membership.name, schema: MembershipSchema }
    ]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '10d' },
        global: true,
      }),
      global: true,
    }),
    FirebaseModule,
    forwardRef(() => BoothsModule),


  ],
  controllers: [],
  providers: [AuthService, AuthResolver, MembershipService],
  exports: [MembershipService, AuthService],
})
export class AuthModule { }
