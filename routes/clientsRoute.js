const express = require('express');
const { getClients, saveClients, updateClient, deleteClient } = require('../controllers/clientsController');
const { upload } = require('../middleware/imageUploadMiddleware');

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      Clients:
 *          type: object
 *          required:
 *              name
 *              amount
 *              image
 *          properties:
 *              id:
 *                  type: string
 *                  description: auto generated client id
 *              name:
 *                  type: string
 *                  description: client name
 *              amount:
 *                  type: number
 *                  description: amount
 *              image:
 *                  type: file
 *                  description: client image
 *          example:
*               id: uix1234ew
*               name: john doe
*               amount: 10
*               image: imageFile
*
*/

/**
 * @swagger
 *      /api/clients:
 *          get:
 *              summary: Returns Client List
 *              responses:
 *                  200:
 *                      description: the list of clients
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Clients'
 *
 */

router.get('/', getClients);


/**
 * @swagger
 *      /api/clients:
 *          post:
 *              summary: Returns Client List
 *              requestBody:
 *                  content:
 *                      multipart/form-data:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  name:
 *                                      type: string
 *                                  amount:
 *                                      type: number
 *                                  image:
 *                                      type: string
 *                                      format: binary
 *              responses:
 *                  200:
 *                      description: the list of clients
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Clients'
 *
 */
router.post('/', upload.single('image'), saveClients);

/**
 * @swagger
 *      /api/clients/{id}:
 *          put:
 *              summary: update Clients
 *              tags: [Clients]
 *              parameters:
 *                  - in: path
 *                    name: id
 *                    schema:
 *                      type: string
 *                    required: true
 *                    description: client Id
 *              requestBody:
 *                  required: true
 *                  content:
 *                      multipart/form-data:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  name:
 *                                      type: string
 *                                  amount:
 *                                      type: number
 *                                  image:
 *                                      type: string
 *                                      format: binary
 *              responses:
 *                  200:
 *                      description: update specific client
 *                      content:
 *                          application/json:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Clients'
 *
 *                  404:
 *                      description: the client wasn't found
 *
 *                  500:
 *                      description: internal server error
 *
 */

router.put('/:id', upload.single('image'), updateClient);


/**
 * @swagger
 *      /api/clients/{id}:
 *          delete:
 *              summary: Remove Client form Client list by Client ID
 *              tags: [Clients]
 *              parameters:
 *                  - in: path
 *                    name: id
 *                    schema:
 *                      type: string
 *                    required: true
 *                    description: client id
 *              responses:
 *                  200:
 *                      description: the list of clients
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Clients'
 *                  404:
 *                      description: client not found
 */
router.delete('/:id', deleteClient);

module.exports = router;