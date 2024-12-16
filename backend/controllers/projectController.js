// import Project from "../database/model/project.js";
// import { nanoid } from "nanoid";
// import User from "../database/model/user.js"; 

// export const createProject = async (req, res) => {
//   try {
//     const { title, description, subject, project_status, createdByUsn, membersUsn } = req.body;

//     if (!(title && description && subject && project_status && createdByUsn)) {
//       return res.status(400).send("All input is required");
//     }
//     const createdBy = await User.findOne({ usn: createdByUsn });
//     if (!createdBy) {
//       return res.status(404).send("User with this USN not found");
//     }
//     let members = [];
//     if (membersUsn && Array.isArray(membersUsn)) {
//       members = await User.find({ usn: { $in: membersUsn } });
//       if (members.length !== membersUsn.length) {
//         return res.status(404).send("One or more members not found");
//       }
//     }
//     const projectCode = nanoid(8); 

//     const newProject = new Project({
//       title,
//       description,
//       subject,
//       code: projectCode,
//       project_status,
//       createdBy: createdBy._id,
//       members: members.map(member => member._id),
//     });

//     const savedProject = await newProject.save();

//     res.status(201).json({
//       message: "Project created successfully",
//       project: savedProject,
//     });
//   } catch (error) {
//     console.error("Error creating project:", error);
//     res.status(500).send("Internal Server Error");
//   }
// };


// export const editProject = async (req, res) => {
//   const { projectId } = req.params;
//   const { title, description, subject, project_status } = req.body;

//   if (!title || !description || !subject || !project_status) {
//     return res.status(400).json({ message: "All fields are required." });
//   }
//   try {
//     const project = await Project.findByIdAndUpdate(
//       projectId,
//       { title, description, subject, project_status },
//       { new: true } 
//     );

//     if (!project) {
//       return res.status(404).json({ message: "Project not found." });
//     }
//     res.status(200).json({
//       message: "Project updated successfully.",
//       project, 
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating project.", error });
//   }
// };


// export const viewUserProjects = async (req, res) => {
//   const { usn } = req.params;

//   try {
//     const user = await User.findOne({ usn });
    
//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }
//     const projects = await Project.find({ createdBy: user._id });
//     res.status(200).json({ projects });
//   } catch (error) {
//     res.status(500).json({ message: "Error retrieving user's projects.", error });
//   }
// };


// export const viewAllProjects = async (req, res) => {
//   try {
//     const projects = await Project.find()
//       .populate("createdBy")  
//     res.status(200).json(projects);
//   } catch (error) {
//     res.status(500).json({ message: "Error retrieving all projects.", error });
//   }
// };

// export const filterProjects = async (req, res) => {
//   const { subject, usn } = req.query; 
//   try {
//     let filter = {};
//     if (subject) filter.subject = subject;
//     if (usn) filter.createdBy = usn; 

//     const projects = await Project.find(filter).populate("createdBy members");
//     res.status(200).json({ projects });
//   } catch (error) {
//     res.status(500).json({ message: "Error filtering projects.", error });
//   }
// };

// export const joinProject = async (req, res) => {
//   const { usn, code } = req.body; 

//   if (!usn || !code) {
//     return res.status(400).json({ message: "All fields are required." });
//   }

//   try {
//     const project = await Project.findOne({ code }); 
//     if (!project) return res.status(404).json({ message: "Project not found." });

//     if (!project.members.includes(usn)) {
//       project.members.push(usn); 
//       await project.save();
//     }

//     res.status(200).json({ message: "Joined project successfully.", project });
//   } catch (error) {
//     res.status(500).json({ message: "Error joining project.", error });
//   }
// };

import Project from "../database/model/project.js";
import { nanoid } from "nanoid";
import User from "../database/model/user.js"; 

export const createProject = async (req, res) => {
  try {
    const { title, description, subject, project_status, createdByUsn, membersUsn } = req.body;

    if (!(title && description && subject && project_status && createdByUsn)) {
      return res.status(400).send("All input is required");
    }

    const createdBy = await User.findOne({ usn: createdByUsn });
    if (!createdBy) {
      return res.status(404).send("User with this USN not found");
    }

    let members = [];
    if (membersUsn && Array.isArray(membersUsn)) {
      members = await User.find({ usn: { $in: membersUsn } });
      if (members.length !== membersUsn.length) {
        return res.status(404).send("One or more members not found");
      }
    }

    const projectCode = nanoid(8); 

    const newProject = new Project({
      title,
      description,
      subject,
      code: projectCode,
      project_status,
      createdBy: createdBy._id,  
      members: members.map(member => member._id),
    });

    const savedProject = await newProject.save();

    res.status(201).json({
      message: "Project created successfully",
      project: savedProject,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const editProject = async (req, res) => {
  const { projectId } = req.params;
  const { title, description, subject, project_status } = req.body;

  if (!title || !description || !subject || !project_status) {
    return res.status(400).json({ message: "All fields are required." });
  }

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
  const { usn } = req.params;

  try {
    const user = await User.findOne({ usn });
    
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const projects = await Project.find({ createdBy: user._id }).populate("createdBy");
    res.status(200).json({ projects });
  } catch (error) {
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
  const { subject, usn } = req.query; 

  try {
    let filter = {};
    if (subject) filter.subject = subject;
    if (usn) {
      const user = await User.findOne({ usn });
      if (user) {
        filter.createdBy = user._id;
      } else {
        return res.status(404).json({ message: "User not found." });
      }
    }

    const projects = await Project.find(filter)
      .populate("createdBy")  
      .populate("members");   
    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ message: "Error filtering projects.", error });
  }
};

export const joinProject = async (req, res) => {
  const { usn, code } = req.body; 

  if (!usn || !code) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const project = await Project.findOne({ code }); 
    if (!project) return res.status(404).json({ message: "Project not found." });

    const user = await User.findOne({ usn });
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

