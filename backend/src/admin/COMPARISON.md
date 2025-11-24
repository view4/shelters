# CLI Approach Comparison

## 📊 Standalone Scripts vs nest-commander

### Current Approach: Standalone ts-node Scripts

**Files:**
- `cli/add-admin-role.ts`
- `cli/remove-admin-role.ts`
- `cli/list-admins.ts`

**Pros:**
- ✅ Simple and straightforward
- ✅ No additional dependencies
- ✅ Works immediately without setup

**Cons:**
- ❌ Duplicates database connection logic
- ❌ Doesn't leverage NestJS DI
- ❌ Can't reuse AdminService (duplicates business logic)
- ❌ Harder to test
- ❌ Not following NestJS patterns

**Example Code:**
```typescript
// Manual database connection
const connection = await mongoose.connect(mongoUrl);
const UserModel = connection.connection.model('User', UserSchema);

// Direct database operations
const user = await UserModel.findOne({ email });
user.roles = [...user.roles, ROLES.ADMIN];
await user.save();
```

---

### Recommended: nest-commander

**Files:**
- `cli.ts` (entry point)
- `admin-cli.module.ts` (CLI module)
- `commands/admin.command.ts` (command implementation)

**Pros:**
- ✅ Leverages NestJS dependency injection
- ✅ Reuses AdminService business logic
- ✅ No database connection boilerplate
- ✅ Easy to test with NestJS testing utilities
- ✅ Follows NestJS conventions
- ✅ Single source of truth for business logic
- ✅ Type-safe with decorators

**Cons:**
- ❌ Requires additional dependency (`nest-commander`)
- ❌ Slightly more complex setup

**Example Code:**
```typescript
@Command({ name: 'admin', description: 'Manage admin roles' })
export class AdminCommand extends CommandRunner {
  constructor(private readonly adminService: AdminService) {
    super();
  }

  async run(params: string[], options?: AdminCommandOptions) {
    // Just call the service - no DB connection needed!
    const user = await this.adminService.initAdmin(email);
    console.log('✅ Done!');
  }
}
```

---

## Side-by-Side Comparison

### Adding Admin Role

**Standalone Script (100+ lines):**
```typescript
// add-admin-role.ts
import * as mongoose from 'mongoose';
import { config } from 'dotenv';
import { UserSchema } from '../../auth/schemas/user.schema';

config();

async function addAdminRole(email: string): Promise<void> {
  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) throw new Error('MONGO_URL required');
  
  // Manual connection
  const connection = await mongoose.connect(mongoUrl, {
    serverSelectionTimeoutMS: 5000,
  });

  try {
    const UserModel = connection.connection.model('User', UserSchema);
    const user = await UserModel.findOne({ email });
    
    if (!user) {
      console.error('User not found');
      process.exit(1);
    }

    // Business logic duplicated from AdminService
    if (user.roles && user.roles.includes(ROLES.ADMIN)) {
      console.log('Already has admin role');
      return;
    }

    user.roles = user.roles ? [...user.roles, ROLES.ADMIN] : [ROLES.ADMIN];
    await user.save();
    
    console.log('Success!');
  } finally {
    await connection.connection.close();
  }
}

// More boilerplate...
```

**nest-commander (clean & simple):**
```typescript
// admin.command.ts
@Command({ name: 'admin', description: 'Manage admin roles' })
export class AdminCommand extends CommandRunner {
  constructor(private readonly adminService: AdminService) {
    super();
  }

  async run(params: string[], options?: AdminCommandOptions) {
    const email = options?.email || params[0];
    
    // That's it! Service handles everything
    const user = await this.adminService.initAdmin(email);
    
    if (!user) {
      console.error('User not found');
      process.exit(1);
    }
    
    console.log('✅ Success!');
  }
}
```

---

## Architecture Comparison

### Standalone Scripts Architecture
```
┌─────────────────────────────┐
│  cli/add-admin-role.ts      │
│  ┌────────────────────────┐ │
│  │ DB Connection Logic    │ │
│  │ Business Logic         │ │
│  │ Error Handling         │ │
│  └────────────────────────┘ │
└─────────────────────────────┘
         ↓
    MongoDB

❌ Business logic duplicated in each script
❌ DB connection in every file
❌ No dependency injection
```

### nest-commander Architecture
```
┌─────────────────────────────┐
│  commands/admin.command.ts  │
│  ┌────────────────────────┐ │
│  │ CLI Interface Only     │ │
│  └────────────────────────┘ │
└──────────┬──────────────────┘
           │ DI
           ↓
┌──────────────────────────────┐
│  AdminService                │
│  ┌─────────────────────────┐ │
│  │ Business Logic (shared) │ │
│  └─────────────────────────┘ │
└──────────┬───────────────────┘
           │ DI
           ↓
┌──────────────────────────────┐
│  User Model (via Mongoose)   │
└──────────┬───────────────────┘
           ↓
       MongoDB

✅ Single source of truth (AdminService)
✅ Proper separation of concerns
✅ Dependency injection throughout
```

---

## Testability Comparison

### Standalone Scripts
```typescript
// Hard to test - need real DB or complex mocking
describe('add-admin-role', () => {
  it('should add admin role', async () => {
    // Need to mock mongoose.connect
    // Need to mock model creation
    // Need to mock DB operations
    // Very complex!
  });
});
```

### nest-commander
```typescript
// Easy to test - just mock the service!
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
            initAdmin: jest.fn().mockResolvedValue({ 
              email: 'test@test.com',
              roles: ['admin']
            }),
          },
        },
      ],
    }).compile();

    command = module.get(AdminCommand);
    service = module.get(AdminService);
  });

  it('should add admin role', async () => {
    await command.run([], { email: 'test@test.com' });
    expect(service.initAdmin).toHaveBeenCalledWith('test@test.com');
  });
});
```

---

## Recommendation

**Use nest-commander** because:

1. **DRY Principle**: AdminService already has the logic - reuse it!
2. **Consistency**: Same patterns as the rest of your NestJS app
3. **Maintainability**: Changes to business logic automatically apply to CLI
4. **Testability**: Easy to test with NestJS testing tools
5. **Scalability**: Easy to add more commands in the future

The only downside is one extra dependency (`nest-commander`), but the benefits far outweigh this.

---

## Migration Steps

1. Install nest-commander:
   ```bash
   npm install nest-commander
   ```

2. Use the new commands (already set up in package.json):
   ```bash
   npm run admin:add user@example.com
   npm run admin:remove user@example.com
   npm run admin:list
   ```

3. Optionally, delete the old `cli/` folder once you've verified everything works

4. Both approaches work simultaneously - migrate when ready!

