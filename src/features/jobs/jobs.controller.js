import Job from "../jobs/jobs.model.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../../errors/index.js";
import { checkPermissions } from "../../utils/checkPermissions.js";

// Récupérer tous les jobs pour l'utilisateur connecté
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.id });
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

// Créer un nouveau job
const createJob = async (req, res) => {
  req.body.createdBy = req.user.id;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

// Récupérer un job spécifique
const getJob = async (req, res) => {
  const { id: jobId } = req.params;
  const job = await Job.findOne({ _id: jobId, createdBy: req.user.id });

  if (!job) {
    throw new NotFoundError(`Aucun job trouvé avec l'id : ${jobId}`);
  }

  checkPermissions(req.user, job.createdBy);

  res.status(StatusCodes.OK).json({ job });
};

// Mettre à jour un job
const updateJob = async (req, res) => {
  if (!req.user || !req.user.id) {
    throw new UnauthorizedError(
      "Utilisateur non authentifié ou informations d'identité manquantes"
    );
  }

  const { id: jobId } = req.params;
  const job = await Job.findOne({ _id: jobId, createdBy: req.user.id });

  if (!job) {
    throw new NotFoundError(`Aucun job trouvé avec l'id : ${jobId}`);
  }

  checkPermissions(req.user, job.createdBy);

  const updatedJob = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: req.user.id },
    req.body,
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json({ job: updatedJob });
};

// Supprimer un job
const deleteJob = async (req, res) => {
  if (!req.user || !req.user.id) {
    throw new UnauthorizedError(
      "Utilisateur non authentifié ou informations d'identité manquantes"
    );
  }

  const { id: jobId } = req.params;
  const job = await Job.findOneAndDelete({
    _id: jobId,
    createdBy: req.user.id,
  });

  if (!job) {
    throw new NotFoundError(`Aucun job trouvé avec l'id : ${jobId}`);
  }

  checkPermissions(req.user, job.createdBy);

  res.status(StatusCodes.OK).json({ msg: "Job supprimé avec succès" });
};

export { getAllJobs, createJob, getJob, updateJob, deleteJob };
