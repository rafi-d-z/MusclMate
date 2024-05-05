resource "aws_elastic_beanstalk_application" "application" {
  name = "backend"
}

resource "aws_elastic_beanstalk_environment" "environment" {
  name                = "terraform-deploy-backend"
  cname_prefix        = "lordfarquaadthecreatorMusclMate"
  application         = aws_elastic_beanstalk_application.application.name
  solution_stack_name = "64bit Amazon Linux 2023 v6.1.4 running Node.js 20"
  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = "aws-elasticbeanstalk-ec2-role"
  }
}