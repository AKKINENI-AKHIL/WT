const request = require('supertest');
const express = require('express');
const connectDB = require('./config/db');

// Mock the database connection
jest.mock('./config/db', () => jest.fn());

const app = express();
app.get('/', (req, res) => res.send('API running'));

describe('Server', () => {
    it('should return 200 OK for the root route', async () => {
        connectDB.mockImplementation(() => Promise.resolve());
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('API running');
    });
});
