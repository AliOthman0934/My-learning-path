import supertest from "supertest";
import app from "../index.js";

const request = supertest(app);

describe('GET /messages', () => {
  it('should get all messages', async () => {
    const response = await request(app).get('/messages');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data.message).toHaveLength(2); 
  });
});

describe('POST /messages', () => {
  it('should add a new message', async () => {
    const newMessage = {
      name: 'John',
      message: 'Hello, this is a new message'
    };

    const response = await request(app)
      .post('/messages')
      .send(newMessage);

    expect(response.status).toBe(201);
    expect(response.body.status).toBe('success');
    expect(response.body.data.message).toHaveProperty('id');
    expect(response.body.data.message.name).toBe(newMessage.name);
    expect(response.body.data.message.message).toBe(newMessage.message);
  });
});


