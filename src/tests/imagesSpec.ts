

import request from 'supertest';
import app from '../index';



describe('Test API', (): void => {
    describe('endpoint: /', (): void => {
        it('gets /', async (): Promise<void> => {
            request(app)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
        });
      });

      describe('endpoint: /api/images', (): void => {
        it('Return error because no query were pass', async (): Promise<void> => {
            request(app)
            .get('/api/images')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400);
        });
        it('Return Image', async (): Promise<void> => {
            request(app)
            .get('/api/images?filename=encenadaport&width=300&height=200')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);}
          );
         
        });
    });
