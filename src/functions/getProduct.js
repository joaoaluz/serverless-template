import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const main = async (event) => {
  const {
    productId,
  } = event.pathParameters;

  const params = {
    TableName: process.env.productsTabledynamodb,
    Key: {
      id: productId,
    },
  };
  try {
    const result = await dynamoDb.get(params).promise();
    console.log(result.Item);
    if (!result.Item) {
      throw new Error('Product not found');
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Success in get product',
        product: result.Item,
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
