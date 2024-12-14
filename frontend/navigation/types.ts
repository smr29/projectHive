export type RootTabParamList = {
  Projects: undefined;
  EditProject: { project: Project };
  AddProject: undefined;
  Login: undefined;
  Home: undefined;
  Register: undefined;
  RegisterTeam: undefined;
  Welcome: undefined;
};
  
export type Project = {
  id: string;
  name: string;
  course: string;
  teamSize: number;
  members: { name: string; usn: string }[];
};