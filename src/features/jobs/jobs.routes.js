import express from "express";
import * as jobsController from "../jobs/jobs.controller.js";
import authenticateUser from "../../middlewares/auth.middlewares.js";
import validate from "../../middlewares/validations.middleware.js";
import { JobBodySchema, JobParamsSchema } from "../jobs/jobs.schema.js";

const router = express.Router();

router
  .route("/")
  .get(authenticateUser, jobsController.getAllJobs)
  .post(
    authenticateUser,
    validate({ bodySchema: JobBodySchema }),
    jobsController.createJob
  );

router
  .route("/:id")
  .get(
    authenticateUser,
    validate({ paramsSchema: JobParamsSchema }),
    jobsController.getJob
  )
  .patch(
    authenticateUser,
    validate({
      paramsSchema: JobParamsSchema,
      bodySchema: JobBodySchema,
    }),
    jobsController.updateJob
  )
  .delete(
    authenticateUser,
    validate({ paramsSchema: JobParamsSchema }),
    jobsController.deleteJob
  );

export default router;
