// import Team from "../database/model/team.js"; 
// import { nanoid } from "nanoid";

// export const createTeam = async (req, res) => {
//   const { name, userId } = req.body;
//   if (!name || !userId) return res.status(400).json({ message: "All fields are required." });

//   try {
//     const code = nanoid(8); 
//     const newTeam = new Team({ name, code, members: [userId] });
//     const team = await newTeam.save();

//     res.status(201).json(team);
//   } catch (error) {
//     res.status(500).json({ message: "Error creating team.", error });
//   }
// };

// export const joinTeam = async (req, res) => {
//     const { userId, code } = req.body;
//     if (!userId || !code) return res.status(400).json({ message: "All fields are required." });
  
//     try {
//       const team = await Team.findOne({ code });
//       if (!team) return res.status(404).json({ message: "Team not found." });
  
//       if (!team.members.includes(userId)) {
//         team.members.push(userId);
//         await team.save();
//       }
  
//       res.status(200).json({ message: "Joined team successfully.", team });
//     } catch (error) {
//       res.status(500).json({ message: "Error joining team.", error });
//     }
//   };
  