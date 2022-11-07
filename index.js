import DynamoDBService from "./services/dynamodb_service.js";
import Worker from './job_dispatcher/worker.js'

const ddbService = new DynamoDBService;
const worker = new Worker
// ddbService.addJob()


// worker.dispatchOverdue(6)

async function main(){
  const immediate = await worker.dispatchOverdue(0)
  console.log(immediate)
}

main()
