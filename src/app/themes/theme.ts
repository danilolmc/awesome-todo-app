export interface Theme{

  name: string;
  properties: {
    "--background-container-color": string,
    "--color-item-finished": string,
    '--tasks-font-color': string,
    '--delete-task-font-color': string,
    '--activated-list-color': string,
  };
}
