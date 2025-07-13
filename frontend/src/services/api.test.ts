import api from './api';

describe('api service', () => {
  it('should have get method', () => {
    expect(typeof api.get).toBe('function');
  });
});
