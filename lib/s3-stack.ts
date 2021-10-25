import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as iam from '@aws-cdk/aws-iam';

export class S3Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucketAuth = new s3.Bucket(this, 'picaro-ai-auth', {
      blockPublicAccess: new s3.BlockPublicAccess({ blockPublicAcls: true, ignorePublicAcls: true }),
    });

    const resultAuth = bucketAuth.addToResourcePolicy(new iam.PolicyStatement({
      sid: 'Stmt1554707441515',
      effect: iam.Effect.ALLOW,
      
      actions : [
        "s3:*"
      ],
      resources: ['arn:aws:s3:::' + bucketAuth.bucketName + '/*' ],
      principals: [new iam.AccountRootPrincipal()],
    }));

    const bucketNotAuth = new s3.Bucket(this, 'picaro-ai-not-auth', {
      blockPublicAccess: new s3.BlockPublicAccess({ blockPublicAcls: true, ignorePublicAcls: true }),
    });

    const resultNotAuth = bucketNotAuth.addToResourcePolicy(new iam.PolicyStatement({
      sid: 'Stmt1554707441515',
      effect: iam.Effect.ALLOW,
      
      actions : [
        "s3:*"
      ],
      resources: ['arn:aws:s3:::' + bucketNotAuth.bucketName + '/*' ],
      principals: [new iam.AccountRootPrincipal()],
    }));
  }
}
