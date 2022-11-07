import DynamoDBService from "./services/dynamodb_service.js";
import Worker from './job_dispatcher/worker.js'

const ddbService = new DynamoDBService;
const worker = new Worker
// ddbService.addJob()


// worker.dispatchOverdue(6)

async function main(){
  const schedule = await ddbService.addJob()
  const immediate = await worker.dispatchOverdue(schedule.shardId)
  console.log(immediate)

  // const {schedules, _} = await ddbService.getOverdueJobs(schedule.shardId)
  // console.log(schedules)

  // const r = await ddbService
  // .updateStatus(schedule, 'SCHEDULED', 'ACQUIRED')
  // .then((schedule) => worker.dispatchToDestination.call(worker, schedule))
  // console.log(r)
}

main()
