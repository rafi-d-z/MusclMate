zip -r "MuscleMate_deploy-v1.zip" ./*

aws s3 cp "MuscleMate_deploy-v1.zip" s3://cancanneed23-musclemate

aws elasticbeanstalk create-application-version\
 --application-name MuscleMate \
 --source-bundle S3Bucket="cancanneed23-musclemate",S3Key="MuscleMate_deploy-v1.zip" \
 --version-label "ver-v1" \
 --description "for assignment 10" \
 --region "us-east-1"\

aws elasticbeanstalk update-environment \
 --environment-name flaskbb-environment \
 --version-label "ver-v1" \
 --region "us-east-1"\