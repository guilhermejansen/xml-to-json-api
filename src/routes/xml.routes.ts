import { Router } from 'express';
import xmlController from '../controllers/xml.controller';
import apiKeyMiddleware from '../middlewares/apiKeyMiddleware';

const router = Router();

/**
 * @swagger
 * /api/xml/parse:
 *   post:
 *     summary: Converte XML para JSON
 *     description: Recebe um XML no corpo da requisição e retorna o JSON convertido.
 *     tags:
 *       - XML Parsing
 *     requestBody:
 *       description: XML a ser convertido
 *       required: true
 *       content:
 *         application/xml:
 *           schema:
 *             type: string
 *             example: |
 *               <listings>
 *                 <listing>
 *                   <destination_id>123</destination_id>
 *                   <name>Hotel Exemplo</name>
 *                   <description>Descrição do hotel.</description>
 *                 </listing>
 *               </listings>
 *     responses:
 *       200:
 *         description: JSON convertido com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   destination_id:
 *                     type: string
 *                     example: "123"
 *                   name:
 *                     type: string
 *                     example: "Hotel Exemplo"
 *                   description:
 *                     type: string
 *                     example: "Descrição do hotel."
 *                   address:
 *                     type: object
 *                     properties:
 *                       city:
 *                         type: string
 *                         example: "São Paulo"
 *                       country:
 *                         type: string
 *                         example: "Brasil"
 *                   latitude:
 *                     type: number
 *                     example: -23.55052
 *                   longitude:
 *                     type: number
 *                     example: -46.633308
 *                   image:
 *                     type: object
 *                     properties:
 *                       url:
 *                         type: string
 *                         example: "http://example.com/image.jpg"
 *                       caption:
 *                         type: string
 *                         example: "Vista do hotel"
 *                   types:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Hotel", "Resort"]
 *                   price:
 *                     type: string
 *                     example: "R$ 200.00"
 *                   url:
 *                     type: string
 *                     example: "http://example.com/hotel"
 *       400:
 *         description: Erro na requisição.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao converter XML para JSON."
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro interno do servidor."
 */
router.post('/xml/parse', apiKeyMiddleware, xmlController.parseXML);

export default router;
