// src/routes/school.route.js
import express from "express";
import {
  createStudentHandler,
  createCourseHandler,
  enrollHandler,
  getStudentTranscriptHandler,
  deleteCourseHandler,
} from "../controllers/school.controller.js";

const router = express.Router();

// Tạo dữ liệu
/**
 * @openapi
 * /api/school/students:
 *   post:
 *     tags:
 *       - Students
 *     summary: Create a new student
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StudentInput'
 *     responses:
 *       '201':
 *         description: Student created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/students", createStudentHandler);
/**
 * @openapi
 * /api/school/courses:
 *   post:
 *     tags:
 *       - Courses
 *     summary: Create a new course
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CourseInput'
 *     responses:
 *       '201':
 *         description: Course created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/courses", createCourseHandler);

// Action: Đăng ký môn học
// Body: { "studentId": 1, "courseId": 2 }
/**
 * @openapi
 * /api/school/enroll:
 *   post:
 *     tags:
 *       - Enrollments
 *     summary: Enroll a student to a course
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EnrollRequest'
 *     responses:
 *       '200':
 *         description: Enrolled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 student:
 *                   $ref: '#/components/schemas/StudentWithCourses'
 *       '500':
 *         description: Cannot enroll student
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/enroll", enrollHandler);

// Query: Xem sinh viên học môn gì
/**
 * @openapi
 * /api/school/students/{id}:
 *   get:
 *     tags:
 *       - Students
 *     summary: Get a student and their enrolled courses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Student with courses
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StudentWithCourses'
 *       '404':
 *         description: Student not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/students/:id", getStudentTranscriptHandler);

// Xóa khóa học
/**
 * @openapi
 * /api/school/courses/{id}:
 *   delete:
 *     tags:
 *       - Courses
 *     summary: Delete a course
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Course deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       '404':
 *         description: Course not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete("/courses/:id", deleteCourseHandler);

export default router;
