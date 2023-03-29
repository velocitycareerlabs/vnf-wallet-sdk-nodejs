import {randomUUID} from 'crypto';
export function userId(): String {
    return randomUUID();
}
