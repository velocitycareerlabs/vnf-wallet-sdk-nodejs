import {randomUUID} from 'crypto';
export function userId(): string {
    return randomUUID();
}
