const { describe, expect, test } = require('@jest/globals');
const request = require('supertest');
const app = require('../app');

describe('GET products by id', () => {

    test('should return 1 product', async () => {
        const response = await request(app)
          .get('/api/products/2')
          .set('Accept', 'application/json');
    
        expect(response.status).toBe(200);
        expect(response.type).toEqual("application/json");
      });
    });