import {createApp, close, createHttpRequest} from '@midwayjs/mock';
import {Framework} from '@midwayjs/koa';

describe('test/controller/user.test.ts', () => {

  it('should POST /api/user/login', async () => {
    // create app
    const app = await createApp<Framework>();
    const startTime = Date.now();

    // make request
    const Rearesult = await createHttpRequest(app).post('/api/user/login').send({username: 'john', password: '123'});
    const Nuesult = await createHttpRequest(app).post('/api/user/login').send({username: '', password: ''});
    const Nuesult2 = await createHttpRequest(app).post('/api/user/login').send({});
    const Eresult1 = await createHttpRequest(app).post('/api/user/login').send({username: 'john', password: 111111});
    const Eresult2 = await createHttpRequest(app).post('/api/user/login').send({username: 'zzzx', password: 123});
    const cost = Date.now() - startTime;

    // use expect by jest


    expect(Rearesult.body.result).toBe('success')
    expect(Rearesult.body.code).toBe(200)
    expect(Rearesult.status).toBe(200);

    expect(Nuesult.body.result).toBe('err')
    expect(Nuesult.body.code).toBe(400)
    expect(Nuesult.status).toBe(200);

    expect(Eresult1.body.result).toBe('err')
    expect(Eresult1.body.code).toBe(400)
    expect(Eresult1.status).toBe(200);

    expect(Eresult2.body.result).toBe('err')
    expect(Eresult2.body.code).toBe(400)
    expect(Eresult2.status).toBe(200);

    expect(Nuesult2.status).toBe(422);


    expect(cost).toBeLessThanOrEqual(1000);

    // close app
    await close(app);
  });
});
