AWS_REGION="us-east-2"  # Use the same region as in your GitHub Actions workflow
APPLICATION_NAME="backend"
ENVIRONMENT_NAME="terraform-deploy-backend"
BUCKET_NAME="terraform-state-muscleman-lordfarquaadthecreator"
ZIP_FILE="musclmate_backend_deploy-${VERSION_SHA}.zip"

zip -r $ZIP_FILE ./$APPLICATION_NAME

aws s3 cp $ZIP_FILE s3://$BUCKET_NAME

aws elasticbeanstalk create-application-version \
    --application-name $APPLICATION_NAME \
    --source-bundle S3Bucket="$BUCKET_NAME",S3Key="$ZIP_FILE" \
    --version-label "ver-$VERSION_SHA" \
    --description "Deployment for commit $VERSION_SHA" \
    --region $AWS_REGION

aws elasticbeanstalk update-environment \
    --environment-name $ENVIRONMENT_NAME \
    --version-label "ver-$VERSION_SHA" \
    --region $AWS_REGION
