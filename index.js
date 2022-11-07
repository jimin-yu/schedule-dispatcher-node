import DynamoDBService from "./services/dynamodb_service.js";
import Worker from './job_dispatcher/worker.js'



function createSampleSchedules(){
  const itemCount = 20;
  Array(itemCount)
  .fill(0)
  .forEach(async ()=>await ddbService.addJob())
}

const ddbService = new DynamoDBService;
const worker = new Worker
// ddbService.addJob()


// worker.dispatchOverdue(6)

async function main(){
  const partitions = [0,1,2,3,4,5,6,7,8,9,10]
  // worker.start(partitions)
  createSampleSchedules()

  // const {schedules, _} = await ddbService.getOverdueJobs(schedule.shardId)
  // console.log(schedules)

  // const r = await ddbService
  // .updateStatus(schedule, 'SCHEDULED', 'ACQUIRED')
  // .then((schedule) => worker.dispatchToDestination.call(worker, schedule))
  // console.log(r)
}

main()
