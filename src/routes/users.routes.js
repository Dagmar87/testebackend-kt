const { Router } = require('express');
const pool = require('../config/db');
const router = Router();
const controller = require('../controllers/users.controller');
const authMiddleware = require('../middlewares/auth');
const { registerValidation, loginValidation, userValidation } = require('../middlewares/validator');

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Verificação de saúde da aplicação
 *     responses:
 *       200:
 *         description: Tudo certo
 */
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

/**
 * @openapi
 * /health/db:
 *   get:
 *     summary: Verificação de saúde do banco de dados
 *     responses:
 *       200:
 *         description: Conexão com o banco está OK
 *       500:
 *         description: Erro na conexão com o banco de dados
 */
router.get('/health/db', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ db: 'ok' });
  } catch (err) {
    res.status(500).json({ db: 'error', message: err.message });
  }
});

/**
 * @openapi
 * /register:
 *   post:
 *     summary: Registra um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao@exemplo.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Usuário já existe ou dados inválidos
 */
router.post('/register', registerValidation, controller.register);

/**
 * @openapi
 * /login:
 *   post:
 *     summary: Autentica um usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: joao@exemplo.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       400:
 *         description: Credenciais ou dados inválidos
 */
router.post('/login', loginValidation, controller.login);

// Rotas protegidas
router.use(authMiddleware);

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Cria um novo usuário (Protegido)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 example: joao@exemplo.com
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       401:
 *         description: Não autorizado
 *       400:
 *         description: Dados inválidos
 */
router.post('/users', userValidation, controller.createUser);

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Lista todos os usuários (Protegido)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *       401:
 *         description: Não autorizado
 */
router.get('/users', controller.getUsers);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Busca um usuário pelo ID (Protegido)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 *       401:
 *         description: Não autorizado
 */
router.get('/users/:id', controller.getUserById);

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     summary: Atualiza um usuário pelo ID (Protegido)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva Atualizado
 *               email:
 *                 type: string
 *                 example: joao.novo@exemplo.com
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       401:
 *         description: Não autorizado
 *       400:
 *         description: Dados inválidos
 */
router.put('/users/:id', userValidation, controller.updateUser);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Remove um usuário pelo ID (Protegido)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do usuário
 *     responses:
 *       204:
 *         description: Usuário removido com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       401:
 *         description: Não autorizado
 */
router.delete('/users/:id', controller.deleteUser);

module.exports = router;
