import { IsIntString } from 'src/decorators/is-int-string.decorator';

export class NumberClassificationDto {
  @IsIntString()
  number: string;
}
