/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Stream } from 'stream';
import { GraphQLScalarType } from 'graphql';

export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}

const GraphQLUpload = new GraphQLScalarType<Promise<FileUpload>, never>({
  name: 'Upload',
});

@InputType()
export class ChangeAvatarInput {
  @Field(type => GraphQLUpload)
  image: Promise<FileUpload>;
}

@ObjectType()
export class ChangeAvatar {
  @Field(type => String)
  message: string;

  @Field(type => String)
  avatar: string;
}
