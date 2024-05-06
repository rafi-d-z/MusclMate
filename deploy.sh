zip -r "MuscleMate_deploy-$1.zip" ./*

aws s3 cp "MuscleMate_deploy-$1.zip" s3://terraform-state-musclemate-cancanneed23

aws elasticbeanstalk create-application-version --application-name MuscleMate --source-bundle S3Bucket="terraform-state-musclemate-cancanneed23",S3Key="MuscleMate_deploy-$1.zip" --version-label "ver-$1" --description "file permissions" --region "us-east-1"

aws elasticbeanstalk update-environment --environment-name flaskbb-environment --version-label "ver-$1" --region "us-east-1"