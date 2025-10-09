/**
 * @swagger
 *  tags:
 *   name: Category
 *   description: category modul
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          createCategory:
 *                type: object
 *                required:
 *                    -   name
 *                    -   icon
 *                properties:
 *                    name:
 *                      type: string
 *                    slug:
 *                      type: string
 *                    icon:
 *                      type: string
 *                    parent:
 *                      type: string
 */

/**
 * @swagger
 *
 * /category:
 *  post:
 *      summary: create category
 *      tags:
 *          -   Category
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/createCategory'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/createCategory'
 *      responses:
 *          201:
 *              description: Successfull
 */

/**
 * @swagger
 *
 * /category:
 *  get:
 *      summary: get all Category
 *      tags:
 *         -    Category
 *      responses:
 *         200:
 *            description: Successfully
 */

/**
 * @swagger
 *
 * /category/{id}:
 *  delete:
 *      summary: delete Category by id
 *      tags:
 *         -    Category
 *      parameters:
 *         -    in: path
 *              name: id
 *      responses:
 *         200:
 *            description: Successfully
 */
