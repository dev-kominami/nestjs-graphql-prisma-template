import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field((_type) => String)
  id: string;

  @Field((_type) => String)
  title: string;
}
