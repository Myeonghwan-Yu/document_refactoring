export class UsersRepositories {
    constructor(prisma) {
      this.prisma = prisma;
    }
  
    createUser = async (email, hashedPassword) => {
      const createdUser = await this.prisma.users.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
      return createdUser;
    };

    loginUser = async (email) => {
        const user = await this.prisma.users.findFirst({where: {email}});

        return user;
    }
  
  
    // 유저 아이디 찾기
    getUserById = async (userId) => {
      const user = await this.prisma.users.findFirst({
        where: { userId: +userId },
      });
      return user;
    };
  }