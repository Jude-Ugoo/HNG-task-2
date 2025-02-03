import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { digitSum, isArmstrong, isPerfect, isPrime } from './utils/math.util';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async classifyNumber(number: number) {
    const properties = [];
    const parity = number % 2 === 0 ? 'even' : 'odd';
    properties.push(parity);

    if (isArmstrong(number)) properties.push('armstrong');

    const funFact = await this.getFunFact(number);

    return {
      number,
      is_prime: isPrime(number),
      is_perfect: isPerfect(number),
      properties,
      digit_sum: digitSum(number),
      fun_fact: funFact,
    };
  }

  private async getFunFact(number: number): Promise<string> {
    try {
      const { data } = await firstValueFrom(
        this.httpService
          .get(`http://numbersapi.com/${number}?json`, { timeout: 500 })
          .pipe(
            catchError(() => {
              return [
                {
                  data: { text: `No fun fact available for ${number}.` },
                },
              ];
            }),
          ),
      );
      return data.text || `No fun fact available for ${number}.`;
    } catch (error) {
      return `No fun fact available for ${number}.`;
    }
  }
}
