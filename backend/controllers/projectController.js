import Project from "../database/model/project.js";
import User from "../database/model/user.js";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import env from "dotenv";

export const createProject = async (req, res) => {
  const { title, description, subject, status, createdByUsn, membersUsn } =
    req.body;

  if (!(title && description && subject && status && createdByUsn)) {
    return res.status(400).send("All input is required");
  }

  const createdBy = await User.findOne({ usn: createdByUsn });
  if (!createdBy) {
    return res.status(404).send("User with this USN not found");
  }

  let membersArray = [];
  if (membersUsn) {
    const membersList =
      typeof membersUsn === "string" ? membersUsn.split(",") : membersUsn;

    if (Array.isArray(membersList)) {
      membersArray = await User.find({ usn: { $in: membersList } });
      if (membersArray.length !== membersList.length) {
        return res.status(404).send("One or more members not found");
      }
    } else {
      return res.status(400).send("Invalid members format");
    }
  }

  const projectCode = nanoid(8);

  const newProject = new Project({
    title,
    description,
    subject,
    code: projectCode,
    status,
    createdBy: createdBy._id,
    members: membersArray.map((member) => member._id),
  });

  try {
    const savedProject = await newProject.save();

    res.status(201).json({
      message: "Project created successfully",
      project: savedProject,
    });
  } catch (error) {
    console.error("Error saving project:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const editProject = async (req, res) => {
  const { projectId } = req.params;
  const { title, description, subject, project_status } = req.body;

  try {
    const project = await Project.findByIdAndUpdate(
      projectId,
      { title, description, subject, project_status },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    res.status(200).json({
      message: "Project updated successfully.",
      project,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating project.", error });
  }
};


export const viewUserProjects = async (req, res) => {
  try {
    const { userId } = req.body; 

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    console.log("User ID received: ", userId);

    const user = await User.findById(userId);  
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    console.log("User found: ", user);

    const projects = await Project.find({ createdBy: user._id }).populate(
      "createdBy",
      "usn"
    );

    res.status(200).json({ projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving user's projects.", error });
  }
};


export const viewAllProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("createdBy")
      .populate("members");
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving all projects.", error });
  }
};

export const filterProjects = async (req, res) => {
  const { subject, created_by } = req.query;

  try {
    let filter = {};

    if (subject) filter.subject = subject;

    if (created_by) {
      const user = await User.findOne({ usn: created_by });
      if (user) {
        filter.createdBy = user._id;
      } else {
        return res
          .status(404)
          .json({ message: "User with the provided USN not found." });
      }
    }

    const projects = await Project.find(filter)
      .populate("createdBy", "name email usn")
      .populate("members", "name email usn");

    return res.status(200).json({ projects });
  } catch (error) {
    console.error("Error filtering projects:", error);
    return res
      .status(500)
      .json({ message: "Error filtering projects.", error });
  }
};

export const joinProject = async (req, res) => {
  const { userId, code } = req.body;  
  console.log("userif",userId)
  if (!userId || !code) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const project = await Project.findOne({ code });
    if (!project)
      return res.status(404).json({ message: "Project not found." });

    const user = await User.findOne({ _id: userId }); 
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!project.members.includes(user._id)) {
      project.members.push(user._id);
      await project.save();
    }

    res.status(200).json({ message: "Joined project successfully.", project });
  } catch (error) {
    res.status(500).json({ message: "Error joining project.", error });
  }
};

