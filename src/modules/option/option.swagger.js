/**
 * @swagger
 *  tags:
 *   name: Option
 *   description: Option Module and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          createOption:
 *                type: object
 *                required:
 *                    -   title
 *                    -   type
 *                    -   key
 *                    -   category
 *                properties:
 *                    title:
 *                      type: string
 *                    key:
 *                      type: string
 *                    category:
 *                      type: string
 *                    guid:
 *                      type: string
 *                    type:
 *                      type: string
 *                      enum:
 *                          -   number
 *                          -   string
 *                          -   boolean
 *                          -   array
 *                    enum:
 *                      type: array
 *                      items:
 *                          type: string
 */

/**
 * @swagger
 *
 * /option:
 *  post:
 *      summary: create option for category
 *      tags:
 *          -   Option
 *      requestBody:
 *          required: true
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/createOption'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/createOption'
 *      responses:
 *          201:
 *              description: Successfull
 */

/**
 * @swagger
 *
 * /option/by-category/{categoryId}:
 *  get:
 *      summary: get option by category by id
 *      tags:
 *         -    Option
 *      parameters:
 *         -    in: path
 *              name: categoryId
 *              type: string
 *      responses:
 *         200:
 *            description: Successfully
 */
/**
 * @swagger
 *
 * /option/{id}:
 *  get:
 *      summary: get option by id
 *      tags:
 *         -    Option
 *      parameters:
 *         -    in: path
 *              name: id
 *              type: string
 *      responses:
 *         200:
 *            description: Successfully
 */

/**
 * @swagger
 *
 * /option:
 *  get:
 *      summary: get all option of category
 *      tags:
 *         -    Option
 *      responses:
 *         200:
 *            description: Successfully
 */
