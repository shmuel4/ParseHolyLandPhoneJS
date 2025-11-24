import ParseHolyLandPhone from '../src/ParseHolyLandPhone';

describe('ParseHolyLandPhone', () => {

    test('creates an instance via static call', () => {
        const number = ParseHolyLandPhone.create('025555555');
        expect(number).toBeInstanceOf(ParseHolyLandPhone);
    });

    test('creates an instance via new', () => {
        const number = new ParseHolyLandPhone('025555555');
        expect(number).toBeInstanceOf(ParseHolyLandPhone);
    });

    test('removes any non digit from number', () => {
        const number = new ParseHolyLandPhone('02-(555)-5555');
        expect(number.phoneNumber).toBe('025555555');
    });

    test('converts to local format', () => {
        const number = new ParseHolyLandPhone('+972 2-(555)-5555');
        expect(number.phoneNumber).toBe('025555555');
    });

    test('has isNot methods for all is methods', () => {
        const number = new ParseHolyLandPhone('025555555');

        const methods = Object.getOwnPropertyNames(
            Object.getPrototypeOf(number)
        ).filter(m => m.startsWith('is') && !m.startsWith('isNot'));

        for (const method of methods) {
            console.log(method)
            const neg = 'isNot' + method.substring(2);
            expect(typeof number[neg]).toBe('function');
            expect(typeof number[neg]()).toBe('boolean');
        }
    });

    test('validates a valid israeli phone number as israeli', () => {
        const number = ParseHolyLandPhone.create('025555555');
        expect(number.isValid()).toBe(true);
    });

    // ------------------------------
    // Kosher / Non-kosher full test
    // ------------------------------

    test('validates isKosher/isValid numbers', () => {

        const nonKosherNumbers = [
            '0527000000',
            '0522000000',
            '0548200000',
            '0555000000',
            '0505000000',
            '0554110000',
            '0504050000',
            '0507610000',
            '0512356666',
            '0526775512',
            '0534516548',
            '0546154485',
            '0548312654',
            '0555641358',
            '0554955555',
            '0586451235',
            '0795416586',
            '023549878',
            '086548745',
            '0738888888',
        ];

        for (const n of nonKosherNumbers) {
            const number = ParseHolyLandPhone.create(n);
            expect(number.isValid()).toBe(true, `isValid failed for number: ${n} (got: ${number.isValid()})`);
            expect(number.isKosher()).toBe(false, `isKosher failed for number: ${n} (got: ${number.isKosher()})`);
        }

        const invalidNumbers = [
            '052760000',
            '0527164xqwd32',
            '055410223--000',
            '0548465666666',
            '08801111111',
            '0526987797974'
        ];

        for (const n of invalidNumbers) {
            const number = ParseHolyLandPhone.create(n);
            expect(number.isValid()).toBe(false, `isValid failed for invalid number: ${n} (got: ${number.isValid()})`);
            expect(number.isKosher()).toBe(false, `isKosher failed erroneously for ${n} (got: ${number.isKosher()})`);
        }

        // 53 - Hot Mobile
        {
            const n = '0533100000';
            const number = ParseHolyLandPhone.create(n);
            expect(number.isValid()).toBe(true, `isValid failed for ${n}`);
            expect(number.isKosher()).toBe(true, `isKosher failed for ${n}`);
        }

        // 5567 - Rami Levy
        {
            const n = '0556700000';
            const number = ParseHolyLandPhone.create(n);
            expect(number.isValid()).toBe(true);
            expect(number.isKosher()).toBe(true);
        }

        // 5540x - Rami Levy (55400–55402)
        for (const p of['55400', '55401', '55402']) {
            const n = '0' + p + '0000';
            const number = ParseHolyLandPhone.create(n);
            expect(number.isValid()).toBe(true);
            expect(number.isKosher()).toBe(true);
        }

        // 55760 - Telzar
        {
            const n = '0557600000';
            const number = ParseHolyLandPhone.create(n);
            expect(number.isValid()).toBe(true);
            expect(number.isKosher()).toBe(true);
        }

        // 55410 - Merkazia
        {
            const n = '0554100000';
            const number = ParseHolyLandPhone.create(n);
            expect(number.isValid()).toBe(true);
            expect(number.isKosher()).toBe(true);
        }

        // 5041 - Pelephone
        {
            const n = '0504100000';
            const number = ParseHolyLandPhone.create(n);
            expect(number.isValid()).toBe(true);
            expect(number.isKosher()).toBe(true);
        }

        // 5832 - Golan
        {
            const n = '0583200000';
            const number = ParseHolyLandPhone.create(n);
            expect(number.isValid()).toBe(true);
            expect(number.isKosher()).toBe(true);
        }

        // 5532 - Free Telecom
        {
            const n = '0553200000';
            const number = ParseHolyLandPhone.create(n);
            expect(number.isValid()).toBe(true);
            expect(number.isKosher()).toBe(true);
        }

        // 5552 - Annatel
        {
            const n = '0555200000';
            const number = ParseHolyLandPhone.create(n);
            expect(number.isValid()).toBe(true);
            expect(number.isKosher()).toBe(true);
        }

        // 53x - Hot Mobile
        for (const p of['5331', '5341']) {
            const n = '0' + p + '00000';
            const number = ParseHolyLandPhone.create(n);
            expect(number.isValid()).toBe(true);
            expect(number.isKosher()).toBe(true);
        }

        // 527x - Cellcom
        for (const p of['5276', '5271']) {
            const n = '0' + p + '00000';
            const number = ParseHolyLandPhone.create(n);
            expect(number.isValid()).toBe(true);
            expect(number.isKosher()).toBe(true);
        }

        // 548x - Partner
        for (const p of['5484', '5485']) {
            const n = '0' + p + '00000';
            const number = ParseHolyLandPhone.create(n);
            expect(number.isValid()).toBe(true);
            expect(number.isKosher()).toBe(true);
        }

        // Bezeq landline
        for (const p of['0280', '0380', '0480', '0980']) {
            const n = p + '00000';
            const number = ParseHolyLandPhone.create(n);
            expect(number.isValid()).toBe(true);
            expect(number.isKosher()).toBe(true);
        }

    });
});