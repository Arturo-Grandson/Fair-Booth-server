import { UserDto } from "../dto/user.dto";

export interface LoginResponse {
  user: UserDto;
  token: string
}