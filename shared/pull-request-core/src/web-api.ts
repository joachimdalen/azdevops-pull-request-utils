import api = require('azure-devops-node-api');
import * as tl from 'azure-pipelines-task-lib/task';

export function getWebApi(): api.WebApi {
  const token = tl.getVariable('System.AccessToken');
  const credHandler = api.getBearerHandler(token);
  const webApi = new api.WebApi(tl.getVariable('System.TeamFoundationCollectionUri'), credHandler);
  return webApi;
}
