# Admin Module with nest-commander

This is the refactored version using **nest-commander** for better NestJS integration.

## Installation

First, install the nest-commander package:

```bash
npm install nest-commander
```

## Benefits of nest-commander

1. ✅ **Native NestJS DI** - Directly injects and uses `AdminService`
2. ✅ **No manual DB connections** - Leverages existing NestJS modules
3. ✅ **Consistent patterns** - Follows NestJS conventions throughout
4. ✅ **Better testability** - Commands are testable like any NestJS service
5. ✅ **Type safety** - Full TypeScript support with decorators
6. ✅ **Cleaner code** - No database connection boilerplate

## CLI Commands

### Add Admin Role to User

```bash
npm run admin:add user@example.com
```

Or using the CLI directly:
```bash
npm run cli -- admin --email user@example.com
```

### Remove Admin Role from User

```bash
npm run admin:remove user@example.com
```

Or:
```bash
npm run cli -- admin --remove --email user@example.com
```

### List All Admin Users

```bash
npm run admin:list
```

Or:
```bash
npm run cli -- admin --list
```

## Architecture

```
admin/
├── admin.module.ts           # Core admin module with services
├── admin-cli.module.ts       # CLI-specific module
├── admin.service.ts          # Business logic (reusable)
├── admin.graphql             # GraphQL schema
├── commands/
│   └── admin.command.ts      # nest-commander command
├── cli/                      # Old standalone scripts (can be removed)
└── README-NEST-COMMANDER.md  # This file
```

The key improvement is that `admin.command.ts` uses dependency injection to access `AdminService`, which means:
- No duplicate database connection code
- Reuses the same business logic
- Easier to test and maintain
- Follows NestJS best practices

## Command Structure

The `AdminCommand` class extends `CommandRunner` and uses decorators:

- `@Command()` - Defines the command name and description
- `@Option()` - Defines command-line options (--email, --remove, --list)

All the business logic stays in `AdminService`, keeping the command clean and focused on CLI interaction.

## Migration Path

If you want to switch to nest-commander:

1. Install: `npm install nest-commander`
2. The new files are already created:
   - `src/cli.ts` - Main CLI entry point
   - `src/admin/admin-cli.module.ts` - CLI module
   - `src/admin/commands/admin.command.ts` - Command implementation
3. The old `cli/` scripts can be kept or removed as needed
4. Package.json scripts are already updated

## Testing

With nest-commander, you can test commands like any NestJS component:

```typescript
import { Test } from '@nestjs/testing';
import { AdminCommand } from './admin.command';
import { AdminService } from '../admin.service';

describe('AdminCommand', () => {
  let command: AdminCommand;
  let service: AdminService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AdminCommand,
        {
          provide: AdminService,
          useValue: {
            initAdmin: jest.fn(),
            // ... mock other methods
          },
        },
      ],
    }).compile();

    command = module.get<AdminCommand>(AdminCommand);
    service = module.get<AdminService>(AdminService);
  });

  // ... tests
});
```

