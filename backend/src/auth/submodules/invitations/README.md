# Invitations Submodule

This module handles user invitations and invitation links for the Shelters application. It is a submodule of the Auth module, following the same pattern as the Firebase submodule.

## Location

`backend/src/auth/submodules/invitations/`

## Overview

The invitations system supports two types of invitations:
1. **Direct Invitations** - Personal invitations sent to specific email addresses
2. **Invitation Links** - Shareable links with usage limits and expiration

## Structure

```
invitations/
├── schema/
│   ├── invitation.schema.ts        # Direct invitation model
│   ├── invitation-link.schema.ts   # Shareable link model
│   └── invited-user.schema.ts      # Connection/tracking model
├── invitations.module.ts            # NestJS module
├── invitations.service.ts           # Business logic
├── invitations.resolver.ts          # GraphQL resolvers
├── invitations.graphql              # GraphQL schema
├── invitations.utils.ts             # Helper functions
└── README.md                        # This file
```

## Database Models

### Invitation
Represents a direct invitation to a specific user by email.
- Tracks inviter, status, optional message
- Automatically prevents duplicates
- Statuses: 'pending', 'accepted', 'expired'

### InvitationLink
Represents a shareable invitation link with usage controls.
- Unique code generation (32-char hex)
- Usage limits (`redemptionLimit`)
- Optional expiration date (`expirationDate`)
- Description for organization

### InvitedUser
Tracks the connection between users and their inviters.
- Links user → invitation/invitationLink → inviter
- Records invitation type ('direct' or 'link')
- Enables complete referral tracking

## Integration

The module is imported in `app.module.ts`:

```typescript
import { InvitationsModule } from './auth/submodules/invitations/invitations.module';

@Module({
  imports: [
    // ... other modules
    InvitationsModule,
  ],
})
export class AppModule { }
```

## Usage in Other Services

```typescript
import { InvitationsService } from 'src/auth/submodules/invitations/invitations.service';

@Injectable()
export class YourService {
  constructor(private invitationsService: InvitationsService) {}

  async doSomething() {
    // Check if user was invited
    const wasInvited = await this.invitationsService.checkUserWasInvited(userId);
    
    // Get invitation stats
    const stats = await this.invitationsService.getInvitationStats(userId);
  }
}
```

## GraphQL API

The module exposes GraphQL queries and mutations for:
- Creating and managing invitations
- Creating and managing invitation links
- Accepting invitations
- Viewing invitees

See `invitations.graphql` and `invitations.resolver.ts` for the complete API.

## Key Features

- ✅ Dual invitation system (direct + links)
- ✅ Complete referral tracking via InvitedUser
- ✅ Automatic expiration and usage limiting
- ✅ Cryptographic code generation
- ✅ Duplicate prevention
- ✅ Integration with AuthGuard and SessionUser
- ✅ Follows Auth module submodule patterns

## Related Modules

- **AuthModule** (`src/auth/`) - Parent module
- **FirebaseModule** (`src/auth/submodules/firebase/`) - Sibling submodule
- **User Schema** (`src/auth/schemas/user.schema.ts`) - Referenced in invitations

## Future Enhancements

- Email notifications for invitations
- Invitation analytics dashboard
- Reward/referral bonus system
- Invitation templates
- Social sharing integration

