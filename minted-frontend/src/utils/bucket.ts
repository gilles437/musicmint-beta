import S3 from "aws-sdk/clients/s3";
import { v4 as uuidv4 } from "uuid";
import configureAWS from "@/utils/ipfs/awsConfig";
import { AlbumMetadata } from "@/lib/redux";

const s3 = configureAWS();
const Bucket = process.env.NEXT_PUBLIC_NFT_METADATA_BUCKET_NAME || "allfeat";

export const uploadFile = async (file: File) => {
  const params: S3.Types.PutObjectRequest = {
    Bucket,
    Key: file?.name || "",
    ContentType: file?.type || "",
    Body: file,
  };
  const result = await s3.putObject(params).promise();

  if (result.$response.httpResponse.statusCode === 200) {
    return result.$response.httpResponse.headers["x-amz-meta-cid"];
  } else {
    return "";
  }
};

export const uploadMetadata = async (metadata: AlbumMetadata) => {
  const myuuid = uuidv4();
  const params: S3.Types.PutObjectRequest = {
    Bucket: process.env.NEXT_PUBLIC_NFT_METADATA_BUCKET_NAME
      ? process.env.NEXT_PUBLIC_NFT_METADATA_BUCKET_NAME
      : "",
    Key: `${myuuid}_metadata.json`,
    ContentType: "application/json",
    Body: new Blob([JSON.stringify(metadata)], {
      type: "application/json",
    }),
  };

  const result = await s3.putObject(params).promise();
  if (result.$response.httpResponse.statusCode === 200) {
    return result.$response.httpResponse.headers["x-amz-meta-cid"];
  } else {
    return "";
  }
};
