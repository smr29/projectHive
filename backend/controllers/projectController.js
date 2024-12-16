import Project from "../database/model/project.js"; 
import Team from "../database/model/team.js";   


export const addProject = async (req, res) => {
  const { title, description, subject, userId, teamId } = req.body;
  if (!title || !description || !subject || !userId || !teamId) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newProject = new Project({ title, description, subject, createdBy: userId, team: teamId });
    const project = await newProject.save();

    const team = await Team.findById(teamId);
    team.projects.push(project._id);
    await team.save();

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Error adding project.", error });
  }
};


export const editProject = async (req, res) => {
    const { projectId, title, description, subject } = req.body;
  
    try {
      const project = await Project.findByIdAndUpdate(
        projectId,
        { title, description, subject },
        { new: true }
      );
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ message: "Error updating project.", error });
    }
  };

  
export const viewUserProjects = async (req, res) => {
    const { userId } = req.params;

    try {
        const projects = await Project.find({ createdBy: userId });
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving projects.", error });
    }
};


export const viewAllProjects = async (req, res) => {
    try {
      const projects = await Project.find().populate("createdBy team");
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving all projects.", error });
    }
  };

  
export const filterProjects = async (req, res) => {
    const { subject, usn } = req.query;

    try {
        let filter = {};
        if (subject) filter.subject = subject;
        if (usn) filter["createdBy.usn"] = usn;

        const projects = await Project.find(filter).populate("createdBy");
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Error filtering projects.", error });
    }
};


  