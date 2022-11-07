import DynamoDBService from "./services/dynamodb_service.js";
import Worker from './job_dispatcher/worker.js'

const ddbService = new DynamoDBService;
const worker = new Worker

function createSampleSchedules(itemCount){
  Array(itemCount)
  .fill(0)
  .forEach(async ()=>await ddbService.addJob())
}

async function main(){
  const partitions = [0,1,2,3,4,5,6,7,8,9,10]
  worker.start(partitions)

  // const {schedules, _} = await ddbService.getOverdueJobs(schedule.shardId)
  // console.log(schedules)

  // const r = await ddbService
  // .updateStatus(schedule, 'SCHEDULED', 'ACQUIRED')
  // .then((schedule) => worker.dispatchToDestination.call(worker, schedule))
  // console.log(r)
}


createSampleSchedules(20)
main()
