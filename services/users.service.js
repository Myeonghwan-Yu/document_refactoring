import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UsersServices {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  // 회원가입
  createUser = async (email, password) => {
    const isExistUser = await this.usersRepository.loginUser(email);

    if (isExistUser) {
      throw new Error('이미 존재하는 이메일 입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await this.usersRepository.createUser(
      email,
      hashedPassword
    );

    return {
      userId: createdUser.userId,
      email: createdUser.email,
    };
  };

  // 로그인
  loginUser = async (email, password) => {
    const user = await this.usersRepository.loginUser(email);
    if (!user) {
      throw new Error('존재하지 않는 이메일 입니다.');
    } else if (!(await bcrypt.compare(password, user.password))) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }

    const token = jwt.sign({ userId: user.userId }, 'custom-secret-key', {
      expiresIn: '12h',
    });

    return {
      message: '로그인되었습니다',
      token: `Bearer ${token}`,
    };
  };

  // 내 정보 조회
  getUserById = async (userId) => {
    const user = await this.usersRepository.getUserById(userId);
    return {
      userId: user.userId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  };
}
