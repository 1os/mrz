'use strict';

const parse = require('../parse');

describe('parse TD3', () => {
  it('Utopia example', function () {
    const MRZ = [
      'P<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<<<<<<<<<',
      'L898902C36UTO7408122F1204159ZE184226B<<<<<10'
    ];

    const result = parse(MRZ);
    expect(result).toMatchObject({
      valid: false,
      format: 'TD3'
    });
    const errors = result.details.filter((a) => !a.valid);
    expect(result.fields).toEqual({
      documentCode: 'P',
      firstName: 'ANNA MARIA',
      lastName: 'ERIKSSON',
      documentNumber: 'L898902C3',
      documentNumberCheckDigit: '6',
      nationality: null,
      sex: 'female',
      expirationDate: '15.04.12',
      expirationDateCheckDigit: '9',
      personalNumber: 'ZE184226B',
      personalNumberCheckDigit: '1',
      birthDate: '12.08.74',
      birthDateCheckDigit: '2',
      issuingState: null,
      compositeCheckDigit: '0'
    });

    const personalNumberDetails = result.details.find(
      (d) => d.field === 'personalNumber'
    );
    expect(personalNumberDetails).toEqual({
      label: 'Personal number',
      field: 'personalNumber',
      value: 'ZE184226B',
      valid: true,
      ranges: [{ line: 1, start: 28, end: 42, raw: 'ZE184226B<<<<<' }],
      line: 1,
      start: 28,
      end: 37
    });

    expect(errors).toHaveLength(2);
    expect(result.valid).toEqual(false);
  });
});