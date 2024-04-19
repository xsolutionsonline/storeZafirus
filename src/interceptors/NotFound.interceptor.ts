import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log("entrodos");
    return next.handle().pipe(
      map((data) => {
        console.log("entrotres", data);
        if (
          data === null ||
          data === false ||
          (Array.isArray(data) && data.length === 0)
        ) {
          console.log("entrocuatro", data);
          throw new HttpException(
            "No se encontraron datos",
            HttpStatus.NOT_FOUND,
          );
        }

        return data;
      }),
    );
  }
}
