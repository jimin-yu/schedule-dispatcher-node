import { DynamoDBService } from "./dynamodbService.js";

const ddbService = new DynamoDBService;
ddbService.getOverdueJobs(1,1)