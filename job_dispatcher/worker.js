import DynamoDBService from "../services/dynamodb_service.js"

class Worker{
  constructor(){
    this.ddbService = new DynamoDBService
  }
  // 서비스 SQS에 넣기
  async dispatchToDestination(schedule){
    console.log("== PUSH JOB TO DESTINATION QUEUE ==")
    console.log(`QUEUE: ${schedule.jobSpec.jobParams}`)
    console.log(`JOB: ${schedule.jobSpec.jobClass}`)
    console.log(`PARAMS: ${schedule.jobSpec.jobParams}`)
  }

  async dispatchOverdue(partition){
    return new Promise((resolve, reject)=>{
      this.ddbService
      .getOverdueJobs(partition)
      .then(({schedules, shouldImmediatelyQueryAgain})=>{
        const promises = schedules.map((schedule)=>{
          this.ddbService
          .updateStatus(schedule, 'SCHEDULED', 'ACQUIRED')
          .then(this.dispatchToDestination)
        })
        Promise.all(promises)
        .then(()=>{
          resolve(shouldImmediatelyQueryAgain);
        })
      })
      .catch((err)=>{
        console.log(err);
        resolve(true);
      })
    })
  }
}

export default Worker