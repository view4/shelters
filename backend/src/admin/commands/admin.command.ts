import { Command, CommandRunner, Option } from 'nest-commander';
import { AdminService } from '../admin.service';

interface AdminCommandOptions {
  email?: string;
  list?: boolean;
  remove?: boolean;
}

@Command({
  name: 'admin',
  description: 'Manage admin roles for users',
})
export class AdminCommand extends CommandRunner {
  constructor(private readonly adminService: AdminService) {
    super();
  }

  async run(passedParams: string[], options?: AdminCommandOptions): Promise<void> {
    if (options?.list) {
      await this.listAdmins();
      return;
    }

    const email = options?.email || passedParams[0];
    
    if (!email) {
      console.error('❌ Email is required');
      console.log('Usage:');
      console.log('  npm run admin -- --email user@example.com');
      console.log('  npm run admin -- --email user@example.com --remove');
      console.log('  npm run admin -- --list');
      process.exit(1);
    }

    if (options?.remove) {
      await this.removeAdminRole(email);
    } else {
      await this.addAdminRole(email);
    }
  }

  @Option({
    flags: '-e, --email <email>',
    description: 'Email address of the user',
  })
  parseEmail(val: string): string {
    return val;
  }

  @Option({
    flags: '-r, --remove',
    description: 'Remove admin role instead of adding',
  })
  parseRemove(): boolean {
    return true;
  }

  @Option({
    flags: '-l, --list',
    description: 'List all admin users',
  })
  parseList(): boolean {
    return true;
  }

  private async addAdminRole(email: string): Promise<void> {
    console.log(`🔍 Looking for user with email: ${email}`);
    
    const user = await this.adminService.initAdmin(email);

    if (!user) {
      console.error(`❌ User not found with email: ${email}`);
      process.exit(1);
    }

    console.log(`✅ Successfully added admin role to user: ${email}`);
    console.log(`   Roles: ${user.roles?.join(', ') || 'none'}`);
  }

  private async removeAdminRole(email: string): Promise<void> {
    console.log(`🔍 Looking for user with email: ${email}`);
    
    const user = await this.adminService.removeAdminRoleByEmail(email);

    if (!user) {
      console.error(`❌ User not found with email: ${email}`);
      process.exit(1);
    }

    console.log(`✅ Successfully removed admin role from user: ${email}`);
    console.log(`   Roles: ${user.roles?.join(', ') || 'none'}`);
  }

  private async listAdmins(): Promise<void> {
    console.log('🔍 Looking for admin users...');
    
    const admins = await this.adminService.listAdmins();

    if (!admins || admins.length === 0) {
      console.log('📭 No admin users found');
      return;
    }

    console.log(`\n👥 Found ${admins.length} admin user(s):\n`);
    
    admins.forEach((admin, index) => {
      console.log(`${index + 1}. ${admin.email}`);
      console.log(`   Roles: ${admin.roles?.join(', ') || 'none'}`);
      console.log('');
    });
  }
}

