import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CompanyService } from '../company/company.service';

@Injectable()
export class AdminService {
  constructor(private users: UsersService, private company: CompanyService) {}

  async listUsers() {
    return this.users.listUsers();
  }

  async listCompanies() {
    return this.company.listCompanies();
  }

  async setUserRoles(userId: string, roles: string[]) {
    return this.users.updateRoles(userId, roles);
  }
}
