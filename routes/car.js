var express = require('express');
var router = express.Router();
var carService = require('../services/car');
var settingsService = require('../services/settings');
const { celebrate,Joi,errors } = require('celebrate');
const carCreateSchema = celebrate({
    body: Joi.object().keys({
        name: Joi.string().alphanum().min(3).max(30).required(),
        license: Joi.string().alphanum().min(3).max(30).required()
    })
});
const carSchema = celebrate({
    body: Joi.object().keys({
        id: Joi.required(),
        license: Joi.string().alphanum().min(3).max(30),
        status: Joi.string().valid('0', '1'),
    })
});
const settingsSchema = celebrate({
    body: Joi.object().keys({
        id: Joi.required(),
        lights: Joi.string().valid('0', '1', '2'),
        signal: Joi.string().valid('0', '1'),
        type: Joi.string().valid('left', 'right'),
        speed: Joi.string().valid('0','10', '20', '30', '40', '50', '60')
    })
});
/**
 * @swagger
 * /cars:
 *   get:
 *     tags:
 *       - Cars
 *     description: Returns all cars
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Returns Car in Array of objects
 */
router.get('/', carService.getAll);
/**
 * @swagger
 * /cars/{id}:
 *   get:
 *     tags:
 *       - Cars
 *     description: Get a particular car with it's Id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: car's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Returns Car data in an object
 */
//get a car
router.get('/:id', carService.getOne);
/**
 * @swagger
 * /cars:
 *   post:
 *     tags:
 *       - Cars
 *     description: create a car
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: name.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: license
 *         description: license.
 *         in: formData
 *         type: string
 *     responses:
 *       200:
 *         description: car
 */
router.post('/',carCreateSchema,carService.create);
/**
 * @swagger
 * /cars/start:
 *   post:
 *     tags:
 *       - Cars
 *     description: start a car
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id of the car to start.
 *         in: formData
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: car
 */
router.post('/start',carSchema, carService.startCar);
/**
 * @swagger
 * /cars/status:
 *   post:
 *     tags:
 *       - Cars
 *     description: change a car's status
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id of the car to change status.
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: status
 *         description: status of the car to change.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: car
 */
router.post('/status',carSchema, carService.setStatus);
/**
 * @swagger
 * /cars/status/{id}:
 *   get:
 *     tags:
 *       - Cars
 *     description: Returns a car's status
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: car's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: An array of car
 */
//get car status
router.get('/status/:id', carService.getStatus);
/**
 * @swagger
 * /cars/license:
 *   post:
 *     tags:
 *       - Cars
 *     description: set a car's License
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id of the car to change status.
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: license
 *         description: license of the car to change.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: car
 */
router.post('/license',carSchema, carService.setLicense);
/**
 * @swagger
 * /cars/license/{id}:
 *   get:
 *     tags:
 *       - Cars
 *     description: Returns a car's license
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: car's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: An array of car
 */
router.get('/license/:id',carService.getLicense);
/**
 * @swagger
 * /cars/lights:
 *   post:
 *     tags:
 *       - Cars
 *     description: set a car's lights
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id of the car to change status.
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: lights
 *         description: lights of the car to change.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: car
 */
router.post('/lights', settingsSchema, settingsService.setLights);
/**
 * @swagger
 * /cars/lights/{id}:
 *   get:
 *     tags:
 *       - Cars
 *     description: Returns a car's lights status
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: car's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: An array of car
 */
router.get('/lights/:id', settingsService.getLights);
/**
 * @swagger
 * /cars/signal:
 *   post:
 *     tags:
 *       - Cars
 *     description: set a car's signal
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id of the car to change.
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: signal
 *         description: signal of the car to change.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: type
 *         description: left or right.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: car
 */
router.post('/signal',settingsSchema,settingsService.setSignal);
/**
 * @swagger
 * /cars/signal/{id}:
 *   get:
 *     tags:
 *       - Cars
 *     description: Returns a car's signal
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: car's id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: type
 *         description: car's signal type
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: An array of car
 */
router.get('/signal/:id', settingsService.getSignal);
/**
 * @swagger
 * /cars/speed:
 *   post:
 *     tags:
 *       - Cars
 *     description: set a car's speed
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id of the car to change.
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: speed
 *         description: speed of the car to change.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: car
 */
router.post('/speed',settingsSchema,settingsService.setSpeed);
/**
 * @swagger
 * /cars/speed/{id}:
 *   get:
 *     tags:
 *       - Cars
 *     description: Returns a car's speed
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: car's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: An array of car
 */
router.get('/speed/:id', settingsService.getSpeed);
module.exports = router;