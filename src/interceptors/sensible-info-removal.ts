import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { removeKeys } from "../utils";

@Injectable()
export class SensibleInformationRemovalInterceptor implements NestInterceptor {
    intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(map(removePassword));
    }
}

function removePassword(response: any) {
    return removeKeys(response, ["password"]);
}
