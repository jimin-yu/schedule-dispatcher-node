
class DynamoDBService {
  constructor(){
  }

  makeQueryRequestForOverdueJobs(partition, timestamp, jobStatus){
    console.log("hello")
  }
  
  getOverdueJobs(partition, timestamp){
    console.log("hi")
  }
}

export { DynamoDBService };