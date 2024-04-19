import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { QueryFailedError } from "typeorm";

@Injectable()
export class DuplicateEntryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (
          error instanceof QueryFailedError &&
          error.message.includes("Duplicate entry")
        ) {
          console.log("entrotres", error);
          throw new HttpException(
            "El código del producto ya existe",
            HttpStatus.BAD_REQUEST,
          );
        }
        throw error;
      }),
    );
  }
}
