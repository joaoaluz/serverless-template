import { v4 as uuidv4 } from 'uuid';
import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const main = async (event) => {
  const {
    name,
    price,
    description,
    s3ImageUrl,
  } = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;

  const params = {
    TableName: process.env.productsTabledynamodb,
    Item: {
      id: uuidv4(),
      name,
      price,
      description,
      s3ImageUrl,
      createdAt: Date.now()
    },
  };

  try {
    await dynamoDb.put(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Success in create product',
        product: params.Item,
      }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({error: error.message}),
    };
  }
};