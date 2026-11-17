
import { utilisateurs } from '../data/data.mjs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import authenticateToken from '../middlewares/auth.mjs';

const Utilisateurs = class Utilisateurs {

    constructor(app) {
        this.app = app;
        this.run();
    }

    // REGISTER
    add() {
        this.app.post('/Utilisateurs/', async (req, res) => {
            try {
                const { nom, prenom, email, password } = req.body;

                if (!nom || !prenom || !email || !password) {
                    return res.status(400).json({
                        message: 'All fields are required'
                    });
                }

                const normalizedEmail = email.toLowerCase().trim();

                const existingUser = utilisateurs.find(
                    user => user.email === normalizedEmail
                );

                if (existingUser) {
                    return res.status(409).json({
                        message: 'Email already exists'
                    });
                }

                const hashedPassword = await bcrypt.hash(password, 12);

                const newUser = {
                    id: randomUUID(),
                    nom,
                    prenom,
                    email: normalizedEmail,
                    password: hashedPassword
                };

                utilisateurs.push(newUser);

                res.status(201).json({
                    message: 'User successfully created',
                    user: {
                        id: newUser.id,
                        nom: newUser.nom,
                        prenom: newUser.prenom,
                        email: newUser.email
                    }
                });

            } catch (error) {
                console.error(error);

                res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
        });
    }

    // LOGIN
    login() {
        this.app.post('/Utilisateurs/login', async (req, res) => {
            try {
                const { email, password } = req.body;

                if (!email || !password) {
                    return res.status(400).json({
                        message: 'Email and password are required'
                    });
                }

                const normalizedEmail = email.toLowerCase().trim();

                const user = utilisateurs.find(
                    user => user.email === normalizedEmail
                );

                if (!user || !(await bcrypt.compare(password, user.password))) {
                    return res.status(401).json({
                        message: 'Invalid email or password'
                    });
                }

                const token = jwt.sign(
                    {},
                    process.env.JWT_SECRET,
                    {
                        subject: user.id,
                        expiresIn: process.env.JWT_EXPIRES_IN || '1d'
                    }
                );

                res.status(200).json({
                    message: 'Login successful',
                    token,
                    user: {
                        id: user.id,
                        nom: user.nom,
                        prenom: user.prenom,
                        email: user.email
                    }
                });

            } catch (error) {
                console.error(error);

                res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
        });
    }

    // GET ALL USERS
    getAll() {
        this.app.get('/Utilisateurs/', authenticateToken, (req, res) => {
            const users = utilisateurs.map(user => ({
                id: user.id,
                nom: user.nom,
                prenom: user.prenom,
                email: user.email
            }));

            res.status(200).json(users);
        });
    }

    // GET USER BY ID
    getById() {
        this.app.get('/Utilisateurs/:id', authenticateToken, (req, res) => {

            if (req.user.id !== req.params.id) {
                return res.status(403).json({
                    message: 'You cannot access another user profile'
                });
            }

            const user = utilisateurs.find(
                user => user.id === req.params.id
            );

            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }

            res.status(200).json({
                id: user.id,
                nom: user.nom,
                prenom: user.prenom,
                email: user.email
            });
        });
    }

    // UPDATE USER
    update() {
        this.app.patch('/Utilisateurs/:id', authenticateToken, (req, res) => {

            if (req.user.id !== req.params.id) {
                return res.status(403).json({
                    message: 'You cannot update another user profile'
                });
            }

            const user = utilisateurs.find(
                user => user.id === req.params.id
            );

            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }

            const { nom, prenom, email } = req.body;

            if (email !== undefined) {
                const normalizedEmail = email.toLowerCase().trim();

                const existingUser = utilisateurs.find(
                    otherUser =>
                        otherUser.email === normalizedEmail &&
                        otherUser.id !== user.id
                );

                if (existingUser) {
                    return res.status(409).json({
                        message: 'Email already exists'
                    });
                }

                user.email = normalizedEmail;
            }

            if (nom !== undefined) user.nom = nom;
            if (prenom !== undefined) user.prenom = prenom;

            res.status(200).json({
                message: 'User successfully updated',
                user: {
                    id: user.id,
                    nom: user.nom,
                    prenom: user.prenom,
                    email: user.email
                }
            });
        });
    }

    // DELETE USER
    delete() {
        this.app.delete('/Utilisateurs/:id', authenticateToken, (req, res) => {

            if (req.user.id !== req.params.id) {
                return res.status(403).json({
                    message: 'You cannot delete another user account'
                });
            }

            const index = utilisateurs.findIndex(
                user => user.id === req.params.id
            );

            if (index === -1) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }

            utilisateurs.splice(index, 1);

            res.status(200).json({
                message: 'User successfully deleted'
            });
        });
    }

    run() {
        this.add();
        this.login();
        this.getAll();
        this.getById();
        this.update();
        this.delete();
    }
};

export default Utilisateurs;
