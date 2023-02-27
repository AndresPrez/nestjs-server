import { Logger, Injectable } from '@nestjs/common';
import { PrismaService } from '@modules/prisma/prisma.service';
import { Prisma, User, RolesOnUsers } from '@prisma/client';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private prisma: PrismaService) { }

  async findMany(
    where: Prisma.UserWhereInput
  ): Promise<User[]> {
    return await this.prisma.user.findMany({ where });
  }

  async findUnique(
    where: Prisma.UserWhereUniqueInput,
  ): Promise<User & { roles: RolesOnUsers[] }> {
    const userInDB = await this.prisma.user.findUnique({ where, include: { roles: true } });
    this.logger.log(`Found user: ${JSON.stringify(userInDB)}`);
    return userInDB;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  // TODO: use bcrypt lib or something similar to encrypt the user's signup password.w
  async createMany(users: Prisma.UserCreateInput) {
    try {

      const newUsers = await this.prisma.user.createMany({ data: users })
      this.logger.log(`${newUsers.count} successfully created.`);
      return newUsers;
    } catch (error) {
      console.log('DEBUG:error:', error)
    }
  }
}
