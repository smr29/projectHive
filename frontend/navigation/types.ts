export type RootTabParamList = {
  Projects: undefined;
  EditProject: { project: Project };
  AddProject: undefined;
  RegisterTeam: undefined;
  JoinTeam: undefined; 
  MyProjects: { refresh?: boolean };
  ProjectStatus: undefined;
};
  
export type Project = {
  id: string;
  name: string;
  description: string;
  subject: string;
  status: string;
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