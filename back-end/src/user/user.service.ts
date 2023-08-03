import {
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './DTO/create.user.dto';
import * as bcrypt from 'bcrypt';

export const bcryptConstant = {
  saltOrRounds: 10,
};

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const isExist = await this.userRepository.findOneBy({
      UserID: createUserDto.UserID,
    });
    if (isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`이미 등록된 사용자입니다.`],
        error: 'Forbidden',
      });
    }

    createUserDto.Password = await bcrypt.hash(
      createUserDto.Password,
      bcryptConstant.saltOrRounds,
    );
    const { Password, ...result } = await this.userRepository.save(
      createUserDto,
    );
    return result;
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async findOne(id: string): Promise<Partial<User>> {
    const user = await this.userRepository.findOneBy({ UserID: id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    const { seq, UserID, Name, Admin } = user;
    return { seq, UserID, Name, Admin };
  }

  async findAllCount(){
    return this.userRepository.count();
  }
}