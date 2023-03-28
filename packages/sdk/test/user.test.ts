import {describe, expect, test} from '@jest/globals';
import { userId } from '../src/index';

describe('user sdk', () => {
    it('should generate a random uuid', () => {
        expect(userId()).toMatch(/.*/)
    })
})