// Import necessary NestJS and RxJS modules for creating interceptors
import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

// Helper interface for class constructors
interface ClassConstructor {
  new (...args: any[]): {};
}

// Custom decorator to apply the SerializeInterceptor with a given DTO
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

// Interceptor to transform outgoing responses to a specific DTO
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  // Intercept the response and transform it using class-transformer
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        // Convert plain objects to instances of the DTO, excluding extraneous values
        return plainToClass(this.dto, data, { excludeExtraneousValues: true });
      }),
    );
  }
}
