import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvitationsResolver } from './invitations.resolver';
import { InvitationsService } from './invitations.service';
import { Invitation, InvitationSchema } from './schema/invitation.schema';
import { InvitationLink, InvitationLinkSchema } from './schema/invitation-link.schema';
import { InvitedUser, InvitedUserSchema } from './schema/invited-user.schema';
import { InvitationApplication, InvitationApplicationSchema } from './schema/invitation-application.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Invitation.name, schema: InvitationSchema },
      { name: InvitationLink.name, schema: InvitationLinkSchema },
      { name: InvitedUser.name, schema: InvitedUserSchema },
      { name: InvitationApplication.name, schema: InvitationApplicationSchema },
    ]),
    forwardRef(() => AuthModule),
  ],
  providers: [InvitationsResolver, InvitationsService],
  exports: [InvitationsService],
})
export class InvitationsModule {}

