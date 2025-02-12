const express = require('express');
const { verifyJwt } = require('../middleware/authMiddleware.js');
const { getVisualMediaContent } = require('../controllers/mediaController.js');

const router = express.Router();

/**
 * @swagger
 * /api/media:
 *   get:
 *     summary: Fetch media content from Cloudinary
 *     description: Retrieves a list of videos stored in Cloudinary.
 *     tags:
 *       - Media
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched media content
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 media:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       public_id:
 *                         type: string
 *                         example: "cgr9ootab0wnt0kxxxom"
 *                       url:
 *                         type: string
 *                         example: "https://res.cloudinary.com/dg3ufgyhh/video/upload/v1739280696/cgr9ootab0wnt0kxxxom.mov"
 *                       format:
 *                         type: string
 *                         example: "mov"
 *                       created_at:
 *                         type: string
 *                         example: "2024-02-12T10:30:00Z"
 *       500:
 *         description: Error fetching media from Cloudinary
 */
router.get('/videos/', verifyJwt, getVisualMediaContent);

module.exports = router;