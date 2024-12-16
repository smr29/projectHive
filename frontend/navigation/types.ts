export type RootTabParamList = {
  Projects: undefined;
  EditProject: { project: Project };
  AddProject: undefined;
  Login: undefined;
  Home: undefined;
  Register: undefined;
  RegisterTeam: undefined;
  Welcome: undefined;
  JoinTeam: undefined; 
};
  
export type Project = {
  id: string;
  name: string;
  course: string;
  teamSize: number;
  members: { name: string; usn: string }[];
};

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  RegisterScreen: undefined;
  // Add other screens here
};

export type RootDrawerParamList = {
  Home: undefined;
  Login: undefined;
  RegisterScreen: undefined;
  // Add other screens here
};