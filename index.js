import DynamoDBService from "./services/dynamodb_service.js";
import WorkerManager from "./job_dispatcher/worker_manager.js";
import Worker from  "./job_dispatcher/worker.js";

const ddbService = new DynamoDBService;
const worker = new Worker;

function createSampleSchedules(itemCount){
  Array(itemCount)
  .fill(0)
  .forEach(async ()=>await ddbService.addJob())
}

async function main(){
  const partitions = [4,5,6,7,8,9]
  // const workerManager = new WorkerManager(partitions)
  // workerManager.start()
  worker.start(partitions)
}


// createSampleSchedules(30)
main()
