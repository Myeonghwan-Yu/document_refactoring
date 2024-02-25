export class UsersController {
    constructor(usersService) {
        this.usersService = usersService
    }

    // 회원가입 컨트롤러
    createUser = async (req, res, next) => {
      try {
        const { email, password, passCon } = req.body;
  
        //유효성검사
        if (password !== passCon || password.length < 6) {
          return res.status(400).json({
            message: "비밀번호의 길이가 짧거나 두 비밀번호가 일치하지 않습니다.",
          });
        }
  
        // 데이터 같이 보내기 + 유저 있는지 검색
        const createUser = await this.usersService.createUser(
          email,
          password,
        );
  
        // return값 받기
        return res.status(201).json({ data: createUser });
      } catch (err) {
        next(err);
      }
    };
  
    // 로그인 컨트롤러
    loginUser = async (req, res, next) => {
      try {
        const { email, password } = req.body;
        const result = await this.usersService.loginUser(email, password);
  
        if (!result) {
            return res.status(401).json({message: "없는 이메일이거나 비밀번호가 틀립니다."});
        }
        
        const {token, message} = result;
        res.cookie("authorization", token);
        return res.status(200).json({message});

      } catch (err) {
        next(err);
      }
    };
  
    // 내정보 조회 컨트롤러
    getUserById = async (req, res, next) => {
      const { userId } = req.user;
  
      const user = await this.usersService.getUserById(userId);
  
      return res.status(200).json({ data: user });
    };
  }