export type RootTabParamList = {
  Projects: undefined;
  EditProject: { project: Project };
  AddProject: undefined;
  RegisterTeam: undefined;
  Welcome: undefined;
  JoinTeam: undefined; 
  MyProjects: undefined;
};
  
export type Project = {
  id: string;
  name: string;
  description: string;
  subject: string;
  status: string;
  // teamSize: number;
  // members: { name: string; usn: string }[];
};

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
};

export type RootDrawerParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
};