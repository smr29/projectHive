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
import User from "../database/model/user.js"; // Import User model
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import env from "dotenv";

export const createProject = async (req, res) => {
  const { title, description, subject, status, createdByUsn, membersUsn } =
    req.body;

  // Validate required fields
  if (!(title && description && subject && status && createdByUsn)) {
    return res.status(400).send("All input is required");
  }

  // Find the user who created the project
  const createdBy = await User.findOne({ usn: createdByUsn });
  if (!createdBy) {
    return res.status(404).send("User with this USN not found");
  }

  // Validate and find team members
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

  // Generate unique project code
  const projectCode = nanoid(8);

  // Create and save the project
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

    // Respond with the saved project
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

  // if (!title || !description || !subject || !project_status) {
  // return res.status(400).json({ message: "All fields are required." });
  // }

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

// View User Projects Endpoint

export const viewUserProjects = async (req, res) => {
  try {
    // Retrieve the token from cookies
    const token = req.cookies.token; // Assuming the token is stored in the cookie with the name 'token'
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied." });
    }

    console.log("token le le ", token);
    // Verify the token

    console.log("token key hai ", process.env.TOKEN_KEY);
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);

    console.log("Decoded is ", decoded);
    const usn = decoded.id;

    console.log("user hai tmhara token ss", usn);
    // Find the user by ID
    const user = await User.findOne({ usn });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    console.log(user);

    // Find projects created by this user
    const projects = await Project.find({ createdBy: user._id }).populate(
      "createdBy",
      "usn"
    );

    res.status(200).json({ projects });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error retrieving user's projects.", error });
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
    // Initialize an empty filter object
    let filter = {};

    // Add subject filter if provided
    if (subject) filter.subject = subject;

    // Add createdBy filter if created_by is provided
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

    // Fetch projects based on the constructed filter
    const projects = await Project.find(filter)
      .populate("createdBy", "name email usn") // Only include specific fields for `createdBy`
      .populate("members", "name email usn"); // Only include specific fields for `members`

    // Return the filtered projects
    return res.status(200).json({ projects });
  } catch (error) {
    console.error("Error filtering projects:", error);
    return res
      .status(500)
      .json({ message: "Error filtering projects.", error });
  }
};

export const joinProject = async (req, res) => {
  const { usn, code } = req.body;

  if (!usn || !code) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const project = await Project.findOne({ code });
    if (!project)
      return res.status(404).json({ message: "Project not found." });

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
