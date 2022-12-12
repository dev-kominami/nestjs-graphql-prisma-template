import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserModel } from './interfaces/user.model';

@Resolver((of) => UserModel)
export class UserResolver {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  // constructor() {}

  @Query(() => [UserModel], { name: 'users', nullable: true })
  async getUsers() {
    return [
      {
        id: 't1',
        title: 'tt1',
      },
      {
        id: 't2',
        title: 'tt2',
      },
    ];
  }
}
