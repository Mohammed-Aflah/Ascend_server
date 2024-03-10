import { User } from "../../entities/UserEntity";
import { LoginBody } from "../../utils/types/loginType";

export interface IAuthRepository {
  signup(body: User): Promise<User>;
  login(body: LoginBody): Promise<User>;
  validateUserData(body:User):Promise<{status:boolean}>
  checkEmailExistforForgot(email:string): Promise<User>;
  updatePassword(email: string, newPass: string): Promise<User>;
}
