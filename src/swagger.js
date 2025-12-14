import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CRUD API",
      description: "API documentation for CRUD application",
    },
    servers: [{ url: "http://localhost:3001", description: "Local server" }],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string", description: "User name" },
            email: { type: "string", description: "User email" },
            password: { type: "string", description: "User password" },
            phone: { type: "string", description: "User phone" },
            dayOfBirth: { type: "string", description: "User day of birth" },
            createdAt: { type: "string", format: "date-time" },
          },
          required: ["name", "email"],
        },
        StudentInput: {
          type: "object",
          properties: {
            name: { type: "string" },
            email: { type: "string" },
          },
          required: ["name", "email"],
        },
        Student: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            email: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        CourseInput: {
          type: "object",
          properties: {
            title: { type: "string" },
            code: { type: "string" },
            description: { type: "string" },
          },
          required: ["title", "code"],
        },
        Course: {
          type: "object",
          properties: {
            id: { type: "integer" },
            title: { type: "string" },
            code: { type: "string" },
            description: { type: "string" },
          },
        },
        StudentWithCourses: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            email: { type: "string" },
            courses: {
              type: "array",
              items: { $ref: "#/components/schemas/Course" },
            },
          },
        },
        EnrollRequest: {
          type: "object",
          properties: {
            studentId: { type: "integer" },
            courseId: { type: "integer" },
          },
          required: ["studentId", "courseId"],
        },
        MessageResponse: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            error: { type: "string" },
          },
        },
        ValidationError: {
          type: "object",
          properties: {
            errors: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  msg: { type: "string" },
                  param: { type: "string" },
                  location: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};
const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
