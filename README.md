BACKGROUND TASK SCHEDULER IN NODE
=================================

local dynamodb
--------------

table 생성
```
aws dynamodb create-table \
    --table-name deali_schedules \
    --attribute-definitions AttributeName=shard_id,AttributeType=S AttributeName=date_token,AttributeType=S \
    --key-schema AttributeName=shard_id,KeyType=HASH AttributeName=date_token,KeyType=RANGE \
    --billing-mode PAY_PER_REQUEST \
    --profile dynamodb-local \
    --endpoint-url http://localhost:8000
```

table 정보
```
aws dynamodb describe-table --table-name deali_schedules --profile dynamodb-local --endpoint-url http://localhost:8000
```

table 삭제
```
aws dynamodb delete-table --table-name deali_schedules --profile dynamodb-local --endpoint-url http://localhost:8000
```

