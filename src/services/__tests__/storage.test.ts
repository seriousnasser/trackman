import Storage from '../Storage';

describe('Storage service', () => {
  beforeEach(() => {
    window.localStorage.clear();
    Storage.set('TEST', true);
    Storage.set('TEST1', { '123': { title: 'test title' } });
  });

  test('value is not set for a key', () => {
    expect(Storage.get('NOT_DEFINED')).toBeFalsy();
    expect(Storage.get('NOT_DEFINED')).toBeFalsy();
  });

  test('value is set for a key', () => {
    expect(Storage.get('TEST')).toBeTruthy();
  });

  test('value is a hash map object', () => {
    expect(Storage.get('TEST1')).toStrictEqual({
      123: {
        title: 'test title',
      },
    });
  });
});
