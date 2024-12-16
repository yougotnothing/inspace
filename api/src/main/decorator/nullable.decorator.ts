import { Field, ReturnTypeFunc, ReturnTypeFuncValue } from '@nestjs/graphql';
import { GqlTypeReference, FieldOptions } from '@nestjs/graphql';

type FieldOptionsExtractor<T> = T extends [GqlTypeReference<infer P>]
  ? FieldOptions<P[]>
  : T extends GqlTypeReference<infer P>
    ? FieldOptions<P>
    : never;

export function NullableField<T extends ReturnTypeFuncValue>(
  returnTypeFunction?: ReturnTypeFunc<T>,
  options?: FieldOptionsExtractor<T>
): PropertyDecorator {
  return Field(returnTypeFunction, { ...options, nullable: true });
}
