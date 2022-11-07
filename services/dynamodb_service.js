import { 
  DynamoDBClient, 
  PutItemCommand, 
  UpdateItemCommand, 
  QueryCommand 
} from "@aws-sdk/client-dynamodb";
import { getRandomInt, makeSampleJobPayload } from '../common/utils.js'
import Schedule from '../common/schedule.js'
import { v4 as uuidv4 } from 'uuid';

class DynamoDBService {
  constructor(){
    this.maxShardId = 10
    this.queryLimit = 5
    this.TableName = 'deali_schedules'
    this.client = new DynamoDBClient({
      endpoint: 'http://localhost:8000'
    });
  }

  // 임시 - 테스트를 위한 random item put
  async addJob(){
    const putItemRequest = {
      TableName: this.TableName,
      Item: {
        shard_id: { S: `${getRandomInt(this.maxShardId)}` },
        date_token: {S: `${Date.now()}#${uuidv4()}`},
        job_status: {S: 'SCHEDULED'},
        job_spec: {S: `${JSON.stringify(makeSampleJobPayload())}`}
      }
    }
    const command = new PutItemCommand(putItemRequest);
    const response = await this.client.send(command);
    console.log(response)
  }

  makeQueryRequestForOverdueJobs(partition, timestamp, jobStatus){
    const input = {
      TableName: this.TableName,
      KeyConditionExpression: 'shard_id = :shardId and date_token < :dateToken',
      FilterExpression: 'job_status = :jobStatus',
      ExpressionAttributeValues: {
        ':shardId': {S: partition.toString()},
        ':dateToken' : {S: timestamp.toString()},
        ':jobStatus' : {S: jobStatus}
      },
      Limit: this.queryLimit
    }
    return new QueryCommand(input)
  }
  
  async getOverdueJobs(partition){
    const timestamp = Date.now()
    const command = this.makeQueryRequestForOverdueJobs(partition, timestamp, 'SCHEDULED');
    return this.client
    .send(command)
    .then((response)=>{
      return {
        schedules: response.Items.map((item)=>new Schedule(item)),
        shouldImmediatelyQueryAgain: response.Count == this.queryLimit || !!response.LastEvaluatedKey
      }
    })
  }

  async updateStatus(schedule, oldStatus, newStatus){
    const updateItemRequest = {
      TableName: this.TableName,
      Key: {
        shard_id: {S: schedule.shardId},
        date_token: {S: schedule.dateToken}
      },
      ConditionExpression: 'job_status = :oldStatus',
      ExpressionAttributeValues: {
        ':oldStatus': {S: oldStatus},
        ':newStatus': {S: newStatus},
      },
      UpdateExpression: 'SET job_status = :newStatus',
      ReturnValues: 'UPDATED_NEW'
    }
    const command = new UpdateItemCommand(updateItemRequest);
    return this.client
    .send(command)
    .then((response)=>{
      const updatedStatus = response.Attributes.job_status.S
      schedule.jobStatus = updatedStatus
      return schedule
    })
  }


}

// export { DynamoDBService };
export default DynamoDBService