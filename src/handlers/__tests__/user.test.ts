import { createNewUser, signin } from "../user"

describe('user handlers', () => {
    let prisma
    let req
    let res
    
    beforeEach(() => {
        prisma = {
        user: {
            create: jest.fn(),
            findUnique: jest.fn()
        }
        }
    
        req = {
        body: {},
        params: {}
        }
    
        res = {
        json: jest.fn(),
        status: jest.fn()
        }
    })
    
    describe('createNewUser', () => {
        it('creates a new user', async () => {
        prisma.user.create.mockResolvedValue({ id: 1 })
        req.body = { username: 'johndoe', password: 'password' }
    
        await createNewUser(req, res)
    
        expect(prisma.user.create).toHaveBeenCalledWith({
            data: {
            username: 'johndoe',
            password: expect.any(String)
            }
        })
    
        expect(res.json).toHaveBeenCalledWith({ token: expect.any(String) })
        })
    })
    
    describe('signin', () => {
        it('signs in a user', async () => {
        prisma.user.findUnique.mockResolvedValue({ id: 1, password: 'hashed' })
        req.body = { username: 'johndoe', password: 'password' }
    
        await signin(req, res)
    
        expect(prisma.user.findUnique).toHaveBeenCalledWith({
            where: { username: 'johndoe' }
        })
    
        expect(res.json).toHaveBeenCalledWith({ token: expect.any(String) })
        })
    
        it('returns 401 if password is incorrect', async () => {
        prisma.user.findUnique.mockResolvedValue({ id: 1, password: 'hashed' })
        req.body = { username: 'johndoe', password: 'wrongpassword' }
    
        await signin(req, res)
    
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({ message: 'nope' })
        })
    })
    })
